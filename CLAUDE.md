# ChessMind — Analizador Semántico de Ajedrez

## Versión actual
- **post-v1.0**: Biblioteca PGN ~148 partidas + Opening Trainer + prompt versioning sobre v1.0-stable

## Stack
- Vite 7 + React 19 + JavaScript + Tailwind v4 (CSS-based)
- chess.js 1.4 + Stockfish WASM 18 Lite + react-chessboard 5
- LLM multi-provider: Ollama (local), Claude API (Haiku/Sonnet), Groq (Llama 3.3 70B)

## Puertos
- **3055**: Frontend (Vite)
- **3056**: API proxy (Node.js HTTP)

## Producción
- URL: https://chessmind-one.vercel.app
- Deploy: Vercel (auto-deploy desde main)
- Stockfish: binarios Lite commiteados en `public/` (~7MB)
- API: Vercel Serverless Functions en `api/`

## Comandos
```bash
npm run dev      # Frontend + API juntos
npm run client   # Solo frontend
npm run server   # Solo API proxy
npm run build    # Build producción
```

## Módulos

La app tiene 2 tabs principales: **Analizador** y **Entrenador de Aperturas**.

### Analizador
Tablero interactivo + carga PGN + evaluación Stockfish + análisis semántico LLM.

Hooks: `useChessGame` → `useStockfish` → `usePositionAnalysis` → `useSemanticAnalysis`

### Opening Trainer
Entrenador de aperturas con 13 aperturas catalogadas, Stockfish como oponente con nivel configurable (0-20), evaluación por jugada, y feedback LLM.

Hooks: `useTrainerEngine` + `useOpeningTrainer` + `useTrainerLLM` + `useTrainerData`

Flujo: `select` → `playing` → `summary`

## Arquitectura
```
src/
  hooks/
    useChessGame.js           — Estado del juego (chess.js)
    useStockfish.js           — Motor WASM via Web Worker (MultiPV)
    usePositionAnalysis.js    — Heurísticas posicionales
    useSemanticAnalysis.js    — Streaming LLM (multi-provider)
    useOpeningTrainer.js      — Estado del trainer (fases, teoría, evaluación)
    useTrainerEngine.js       — Stockfish dedicado para trainer (Skill Level)
    useTrainerLLM.js          — LLM dedicado para trainer (feedback por jugada)
    useTrainerData.js         — Persistencia de sesiones y stats (localStorage)
    useGameLibrary.js         — Hook de biblioteca PGN (filtros, Lichess search)
  lib/
    heuristics.js             — Funciones puras de análisis
    promptBuilder.js          — Constructor de prompts (phase-aware)
    promptVersions.js         — Definiciones de versiones de prompt
    trainerPromptBuilder.js   — Constructor de prompts del trainer
    stockfishParser.js        — Parser UCI
  data/
    openings.js               — Catálogo de 13 aperturas (mainLine, variantes, ideas)
    classicGames.js           — 16 partidas clásicas PGN
    sampleGames.js            — ~148 partidas curadas con metadatos ricos
    _batch1.js … _batch4.js   — Lotes de partidas (románticas→contemporáneas+instructivas)
  components/
    Board.jsx                 — Tablero compartido (react-chessboard)
    LLMSelector.jsx           — Selector de provider/modelo (compartido)
    GameLibrary.jsx           — Modal biblioteca: 3 tabs (Colección/Lichess/Manual)
    trainer/
      TrainerView.jsx         — Container principal (instancia hooks)
      OpeningSelector.jsx     — Selector de apertura por categoría
      TrainerSession.jsx      — Sesión de juego (tablero + feedback + controles)
      TrainerFeedbackPanel.jsx — Panel lateral de feedback semántico
server/index.js               — API proxy local (Ollama + Claude + Groq)
api/
  _shared.js                  — Config compartida, system prompts, CORS
  analyze-claude.js           — Endpoint Claude (Vercel)
  analyze-groq.js             — Endpoint Groq (Vercel)
  lichess.js                  — Proxy Lichess API (Vercel)
  health.js                   — Health check proveedores
```

## Trainer: Clasificaciones de jugadas

| cpLoss | Clasificación | Símbolo |
|--------|--------------|---------|
| 0 | book (jugada de teoría) | 📖 |
| ≤5 | excellent | ✓✓ |
| ≤20 | good | ✓ |
| ≤50 | inaccuracy | ?! |
| ≤100 | mistake | ? |
| >100 | blunder | ?? |

Accuracy ACPL: `max(0, min(1, 1 - avgCpLoss / 100))`

## Providers LLM
- **Ollama**: Local, requiere `ollama serve` + `ollama pull llama3.2`. Gratis pero lento. Solo en dev.
- **Claude**: Requiere `ANTHROPIC_API_KEY` en env. Modelos: Haiku 4.5 (rápido), Sonnet 4 (mejor calidad).
- **Groq**: Requiere `GROQ_API_KEY` en env. Modelo: Llama 3.3 70B. Rápido pero menor calidad ajedrecística.

## Prompt Versioning (Analizador)
- **v1 "Base"**: Prompt directo sin ejemplos
- **v2 "Few-shot"**: Con 3 ejemplos modelo (apertura, medio juego, final)
- Selector en UI (SemanticPanel), persiste en localStorage
- Cache key incluye versión: `${provider}:${promptVersion}:${fen}`

## System Prompts (Trainer)
- **trainer**: Feedback por jugada (~80 palabras, español rioplatense, enfoque didáctico)
- **trainerSummary**: Resumen narrativo al finalizar sesión (~150 palabras)

## LocalStorage Keys
| Key | Uso |
|-----|-----|
| `chessmind-llm-provider` | Provider LLM (compartido analyzer/trainer) |
| `chessmind-llm-model` | Modelo LLM (compartido analyzer/trainer) |
| `chessmind-prompt-version` | Versión de prompt del analizador |
| `chessmind-semantic-cache` | Cache de análisis semánticos |
| `chessmind-trainer-strength` | Skill Level de Stockfish en trainer (0-20) |
| `chessmind-trainer-sessions` | Historial de sesiones (últimas 50) |
| `chessmind-trainer-stats` | Stats por apertura (accuracy, profundidad, etc.) |

## Git Tags
- `v1.0-stable`: Última versión estable antes de prompt versioning (commit 1b0cd4f, 2026-02-22)

## Notas
- Stockfish WASM Lite en `public/` (binarios commiteados, no npm)
- Piezas custom via prop customPieces de react-chessboard
- Análisis semántico usa debounce de 2s y cache por FEN+provider+version
- System prompt: español rioplatense, ~80 palabras, 3-4 oraciones, sin markdown
- max_tokens: 300 para Groq/Ollama, 1024 para Claude
- ~148 partidas curadas en Biblioteca (7 eras + instructivas + finales) con búsqueda, filtros, y Lichess API
- 13 aperturas catalogadas en 5 categorías (abiertas, semiabiertas, cerradas, indias, flancos)
- Documentación detallada en `docs/` (ARCHITECTURE, COMPONENTS, HOOKS, LLM, OPENINGS)

---

## Changelog

### Biblioteca PGN (2026-02-28)
- Biblioteca de ~148 partidas curadas: 7 eras (romántica→contemporánea) + instructivas por apertura + estudios de finales
- Modal con 3 tabs: Colección (búsqueda + filtros), Buscar en Lichess, PGN Manual
- Filtros combinables: era, resultado, grupo ECO (A-E), rango Elo, rango año
- Búsqueda full-text por jugador, apertura, evento, tags
- Proxy serverless Lichess API (`api/lichess.js`) para búsqueda de partidas por usuario (evita CORS)
- Mirror local en `server/index.js` para desarrollo
- Datos organizados en 4 batch files (`_batch1.js` … `_batch4.js`) + colección base en `sampleGames.js`
- Hook `useGameLibrary` con filtrado local via useMemo + búsqueda Lichess con AbortController
- Reemplaza PgnLoader como punto de entrada — botón "Biblioteca" en header

### Pistas semánticas en Trainer (2026-02-27)
- Sistema de pistas progresivas de 2 niveles: primero pista conceptual, después jugada concreta
- `moveHints` por jugada en las 13 aperturas: explican la idea estratégica sin revelar la jugada
- `getSemanticHint()` en useOpeningTrainer para obtener la pista de la posición actual
- UI: click 1 = pista semántica (ej: "Apuntá con el alfil a la casilla más débil del enroque enemigo"), click 2 = jugada esperada

### Opening Trainer + Docs (2026-02-23)
- Opening Trainer completo: 4 fases de desarrollo (selector → engine → LLM feedback → persistencia)
- 13 aperturas en 5 categorías con líneas principales, variantes, e ideas clave
- Stockfish como oponente con Skill Level configurable (0-20)
- Evaluación por jugada con clasificación (book/excellent/good/inaccuracy/mistake/blunder)
- Feedback semántico LLM por jugada con selector de provider/modelo
- Resumen narrativo LLM al finalizar sesión con stats de accuracy
- Persistencia de sesiones y stats por apertura en localStorage
- Fix: restart-with-black bug (sessionId counter)
- Fix: re-trigger LLM al cambiar modelo (triggerAnalysis + setTimeout)
- Fix: tooltip custom para engine strength (reemplaza title nativo)
- Documentación completa: README, ARCHITECTURE, COMPONENTS, HOOKS, LLM, OPENINGS

### post-v1.0 — Prompt versioning (2026-02-22)
- Sistema de versionado de prompts: v1 "Base" (directo) y v2 "Few-shot" (con 3 ejemplos modelo)
- Selector de versión en UI con persistencia en localStorage
- Cache key incluye versión del prompt

### v1.0-stable — Primera versión estable (2026-02-22)
- App completa: tablero interactivo, carga PGN, evaluación Stockfish, análisis semántico LLM
- Deploy en Vercel con Serverless Functions (CommonJS) y Stockfish Lite commiteado (~7MB)
- Tres providers LLM: Ollama (local), Claude API (Haiku/Sonnet), Groq (Llama 3.3 70B)
- Prompts fase-aware (apertura, medio juego, final) con output conciso en español rioplatense
- 16 partidas clásicas precargadas en el menú PGN
- Eval bar sincronizada con la altura del tablero
- Piezas custom via react-chessboard

### Desarrollo inicial (2026-02-21)
- Commit inicial con toda la app: React 19, Vite 7, chess.js, Stockfish WASM, react-chessboard
- Fix serverless functions de Vercel (migración a CommonJS, sin framework)
- Fix acceso a estado de providers en SemanticPanel (bracket notation)
- Múltiples iteraciones de Stockfish en producción: Lite local, build-time copy, GitHub Releases, y finalmente binarios Lite commiteados en `public/`
- Agregadas 11 partidas clásicas al menú PGN (de 5 a 16 total)
