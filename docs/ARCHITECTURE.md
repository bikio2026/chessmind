# Arquitectura

## Capas

```
┌──────────────────────────────────────────────────┐
│  UI Layer (React components)                     │
│  App.jsx → Analyzer tab / Trainer tab            │
├──────────────────────────────────────────────────┤
│  Hook Layer (state management)                   │
│  useChessGame, useStockfish, useOpeningTrainer...│
├──────────────────────────────────────────────────┤
│  Utility Layer (pure functions)                  │
│  heuristics.js, stockfishParser.js, prompts...   │
├──────────────────────────────────────────────────┤
│  Service Layer (external I/O)                    │
│  Stockfish WASM Worker / LLM API (SSE) / chess.js│
└──────────────────────────────────────────────────┘
```

## Tabs

La app tiene dos tabs principales, cada uno con su propia jerarquia de estado:

- **Analizador** — Analisis de posiciones con Stockfish + LLM
- **Entrenador** — Practica de aperturas contra el motor

El tab activo se persiste en `localStorage('chessmind-tab')`.

---

## Data Flow: Analizador

```
Usuario mueve pieza
  → useChessGame.makeMove(from, to)
  → position (FEN) cambia
  → useStockfish.analyze(fen)          [Web Worker, MultiPV 3]
  → usePositionAnalysis(fen)           [heuristics: material, centro, desarrollo...]
  → buildAnalysisPrompt(fen, lines, heuristics)
  → useSemanticAnalysis.analyze(prompt) [SSE streaming → /api/analyze-*]
  → UI: Board + EvalBar + EnginePanel + SemanticPanel
```

**Cache**: El analisis LLM se cachea por `${provider}:${promptVersion}:${fen}` con debounce de 2s.

## Data Flow: Entrenador

```
[Fase: select]
  OpeningSelector → usuario elige apertura
  → useOpeningTrainer.startSession(opening)

[Fase: playing]
  Si player=black → motor juega 1er movimiento de teoria

  Turno del usuario:
    Board.onMove → makeTrainerMove(from, to)
    → ¿En teoria? → compara con mainLine[i]
      → Coincide: clasificacion = "book" (📖)
      → No coincide: marca desvio, evalua con Stockfish
    → ¿Post-teoria? → evaluateMove(fenBefore, fenAfter)
      → Clasifica segun centipawn loss
    → Si LLM habilitado → buildTrainerPrompt → llm.analyze (SSE)

  Turno del motor:
    → En teoria: juega mainLine[i] tras 500ms
    → Post-teoria: getEngineMove(fen, skillLevel)

[Fase: summary]
  → endSession() calcula accuracy (ACPL), clasificaciones, momentos clave
  → Guarda sesion en localStorage (ultimas 50)
  → buildSummaryPrompt → summaryLLM.analyze
```

---

## Clasificacion de jugadas

| Clasificacion | CP loss | Color | Simbolo |
|---|---|---|---|
| Libro | en teoria | `#a78bfa` violeta | 📖 |
| Excelente | <= 5 | `#4ade80` verde | ✓✓ |
| Buena | <= 20 | `#86efac` verde claro | ✓ |
| Imprecision | <= 50 | `#fbbf24` amarillo | ?! |
| Error | <= 100 | `#fb923c` naranja | ? |
| Blunder | > 100 | `#f87171` rojo | ?? |

**Precision** = `max(0, min(1, 1 - avgCpLoss / 100))` (ACPL-based, como Lichess)

---

## Persistencia (localStorage)

| Key | Valor | Modulo |
|-----|-------|--------|
| `chessmind-tab` | `'analyzer'` / `'trainer'` | App |
| `chessmind-theme` | Tema de piezas | Compartido |
| `chessmind-semantic` | `'true'/'false'` | Analizador |
| `chessmind-llm-provider` | `'ollama'/'claude'/'groq'` | Compartido |
| `chessmind-llm-model` | ID del modelo | Compartido |
| `chessmind-prompt-version` | `'v1'/'v2'` | Analizador |
| `chessmind-trainer-strength` | `0-20` (Skill Level) | Entrenador |
| `chessmind-trainer-llm` | `'true'/'false'` | Entrenador |
| `chessmind-trainer-guided` | `'true'/'false'` | Entrenador |
| `chessmind-trainer-sessions` | JSON array (ultimas 50) | Entrenador |
| `chessmind-trainer-stats` | JSON (stats por apertura) | Entrenador |

---

## API Proxy

### Desarrollo (server/index.js → :3056)
Servidor HTTP Node.js que proxea a los providers LLM. Vite proxea `/api/*` al port 3056.

### Produccion (api/ → Vercel Serverless)
Funciones serverless CommonJS en el directorio `api/`. Mismos endpoints.

### Endpoints

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/api/health` | Status de providers (ollama, claude, groq) |
| POST | `/api/analyze` | Ollama streaming (solo local) |
| POST | `/api/analyze-claude` | Claude API streaming |
| POST | `/api/analyze-groq` | Groq API streaming (OpenAI-compatible) |
| POST | `/api/start-ollama` | Inicia Ollama server (solo local) |

Todas las respuestas de analisis usan **Server-Sent Events (SSE)**:
```
data: {"token": "Las blancas"}
data: {"token": " tienen ventaja"}
data: {"done": true}
```

---

## Stockfish

- **Binario**: Stockfish 18 Lite WASM (~7MB) en `public/stockfish-18-lite-single.js`
- **Carga**: Web Worker, fallback a Lite si la version completa falla
- **Analizador**: MultiPV 3, profundidad variable, analisis continuo
- **Entrenador**: Instancia separada con task queue
  - Skill Level UCI: `setoption name Skill Level value X` (0-20)
  - Profundidad: `min(8 + skillLevel, 18)` plys
