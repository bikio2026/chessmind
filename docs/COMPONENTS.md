# Componentes

## Arbol jerarquico

```
App.jsx
├── Header (tabs + controles contextuales)
│
├── [tab: analyzer]
│   ├── Board.jsx              — Tablero interactivo (react-chessboard)
│   ├── EvalBar.jsx            — Barra de evaluacion vertical
│   ├── EnginePanel.jsx        — Lineas de Stockfish (UCI→SAN)
│   ├── MoveList.jsx           — Historia de jugadas navegable
│   ├── SemanticPanel.jsx      — Narrativa LLM + selector de prompt
│   ├── PgnLoader.jsx          — Modal para cargar PGN
│   ├── PieceThemeSelector.jsx — Selector visual de piezas
│   └── LLMSelector.jsx        — Selector de provider/modelo LLM
│
└── [tab: trainer]
    └── TrainerView.jsx        — Container (state machine: select/playing/summary)
        ├── OpeningSelector.jsx  — Grid de aperturas con stats
        ├── TrainerSession.jsx   — Layout in-game
        │   ├── Board.jsx          — (reutilizado)
        │   ├── TheoryTracker      — Progreso en la linea principal (inline)
        │   ├── FeedbackCard       — Clasificacion + LLM expandible (inline)
        │   ├── TrainerMoveList.jsx — Jugadas con clasificaciones color-coded
        │   ├── StrengthSlider     — Nivel del motor con tooltip (inline)
        │   └── LLMSelector.jsx    — (reutilizado)
        ├── TrainerFeedbackPanel.jsx — Panel de narrativa LLM (summary)
        └── [summary view]         — Inline en TrainerView.jsx
```

---

## Componentes principales

### Board.jsx
Wrapper de `react-chessboard` con square highlighting, legal moves, y soporte para custom pieces.

| Prop | Tipo | Descripcion |
|------|------|-------------|
| `position` | string (FEN) | Posicion actual |
| `onMove` | `(from, to, promo) => object\|null` | Callback sincrono |
| `orientation` | `'white'/'black'` | Orientacion del tablero |
| `lastMove` | `{from, to}` | Ultima jugada (highlight) |
| `pieces` | object | Custom piece renderers |

### LLMSelector.jsx
Selector compartido entre analizador y entrenador. Dropdown con providers y modelos.

| Prop | Tipo | Descripcion |
|------|------|-------------|
| `provider` | string | Provider actual (`'claude'/'groq'/'ollama'`) |
| `model` | string | ID del modelo actual |
| `providerStatus` | object | `{ollama, claude, groq, ollamaModels, ...}` |
| `enabled` | boolean | LLM activado/desactivado |
| `isProduction` | boolean | Oculta Ollama en produccion |
| `onChange` | `(provider, model) => void` | Cambio de modelo |
| `onToggle` | `() => void` | Toggle on/off |

### TrainerView.jsx
Container principal del entrenador. Maneja la state machine de fases.

| Fase | Componente renderizado |
|------|----------------------|
| `select` | `OpeningSelector` |
| `playing` | `TrainerSession` |
| `summary` | Vista inline con stats + `TrainerFeedbackPanel` |

**Hooks que instancia**: `useTrainerEngine`, `useOpeningTrainer`, `useTrainerLLM` (para summary), `useTrainerData`

### TrainerSession.jsx
Layout in-game del entrenador. Contiene sub-componentes inline.

**Hooks propios**: `useTrainerLLM` (para feedback por jugada)

**Sub-componentes inline**:
- `TheoryTracker` — Barra de progreso + modos de pista (sin guia/pista/guiado)
- `FeedbackCard` — Clasificacion con LLM expandible ("¿Por que?") + error display
- `StrengthSlider` — Slider de Skill Level con tooltip informativo (Info icon)

### OpeningSelector.jsx
Grid de aperturas agrupadas por categoria con filtro y estadisticas.

### TrainerMoveList.jsx
Lista de jugadas con indicador de clasificacion color-coded por jugada del usuario.

### EvalBar.jsx
Barra vertical de evaluacion sincronizada con la altura del tablero. Usa funcion sigmoid para mapear score a porcentaje.

### EnginePanel.jsx
Muestra las mejores lineas de Stockfish (hasta 3). Convierte PV (UCI) a notacion SAN. Muestra profundidad y WDL%.

### SemanticPanel.jsx
Panel de narrativa LLM con selector de version de prompt (v1/v2). Incluye indicadores de estado del provider.
