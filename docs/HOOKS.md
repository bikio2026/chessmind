# Hooks

## Diagrama de dependencias

```
App.jsx
├── useChessGame          — Estado del juego (analizador)
├── useStockfish          — Motor WASM (analizador)
├── usePositionAnalysis   — Heuristicas posicionales
├── useSemanticAnalysis   — LLM streaming (analizador)
│
└── TrainerView
    ├── useTrainerEngine  — Motor WASM dedicado (entrenador)
    ├── useOpeningTrainer — Estado central del entrenador
    │     └── (usa trainerEngine internamente)
    ├── useTrainerLLM     — LLM streaming (summary)
    └── useTrainerData    — Persistencia localStorage
```

---

## useChessGame

**Proposito**: Estado completo del juego de ajedrez para el analizador.

**Retorna**:
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| `position` | string | FEN actual |
| `history` | array | Movimientos con metadata (verbose) |
| `currentMoveIndex` | number | Indice de la jugada actual (-1 = inicio) |
| `turn` | `'w'/'b'` | Turno actual |
| `isGameOver` | boolean | Partida terminada |
| `pgnHeaders` | object\|null | `{White, Black, WhiteElo, BlackElo, ...}` |

**Acciones**:
| Funcion | Descripcion |
|---------|-------------|
| `makeMove(from, to, promo)` | Jugar una jugada |
| `goForward()` / `goBack()` | Navegar por la historia |
| `goToMove(index)` | Ir a una jugada especifica |
| `goToStart()` / `goToEnd()` | Ir al inicio/final |
| `loadPgn(pgn)` | Cargar partida desde PGN |
| `reset()` | Resetear al estado inicial |

---

## useStockfish

**Proposito**: Wrapper del Web Worker de Stockfish para el analizador.

**Retorna**:
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| `isReady` | boolean | Worker cargado y listo |
| `isAnalyzing` | boolean | Analizando posicion |
| `lines` | array | Mejores lineas (MultiPV 3) con score, PV, depth |
| `engineLabel` | string | Nombre del motor cargado |
| `loadingStatus` | string | Estado de carga (`'loading'/'ready'/'error'`) |

**Acciones**:
| Funcion | Descripcion |
|---------|-------------|
| `analyze(fen, depth?)` | Analizar posicion |

**Notas**: Intenta cargar SF completo; si falla, cae a Lite. MultiPV 3. Parsea output UCI via `stockfishParser.js`.

---

## usePositionAnalysis

**Proposito**: Analisis heuristico de la posicion (material, centro, desarrollo, etc.)

**Parametros**: `(fen: string)`

**Retorna**: Objeto con 7 dimensiones heuristicas:
- `materialBalance` — Diferencia de material
- `centerControl` — Control de casillas centrales
- `development` — Piezas desarrolladas vs posicion inicial
- `pawnStructure` — Peones doblados, aislados, pasados
- `kingSafety` — Enroque, peones de proteccion
- `pieceActivity` — Movilidad de piezas
- `spaceAdvantage` — Casillas controladas

**Cache**: Cachea por FEN para evitar recalcular.

---

## useSemanticAnalysis

**Proposito**: Streaming LLM para el analizador. Multi-provider con cache y debounce.

**Retorna**:
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| `narrative` | string | Texto generado (acumulado via SSE) |
| `isAnalyzing` | boolean | Streaming activo |
| `error` | string\|null | Error del provider |
| `providerStatus` | object | Disponibilidad de cada provider |

**Acciones**:
| Funcion | Descripcion |
|---------|-------------|
| `analyze(prompt, fen, provider, model, version)` | Iniciar analisis (debounced) |
| `checkHealth()` | Verificar providers disponibles |
| `clearNarrative()` | Limpiar texto |
| `startOllama()` | Iniciar Ollama server (local) |

**Cache key**: `${provider}:${promptVersion}:${fen}` — evita llamadas repetidas al LLM.

---

## useOpeningTrainer

**Proposito**: Estado central del entrenador de aperturas. State machine con 3 fases.

**Parametros**: `({ trainerEngine })`

**Retorna**:
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| `phase` | `'select'/'playing'/'summary'` | Fase actual |
| `opening` | object\|null | Apertura seleccionada |
| `playerColor` | `'white'/'black'` | Color del jugador |
| `position` | string | FEN actual |
| `history` | array | Movimientos (verbose) |
| `turn` | `'w'/'b'` | Turno |
| `isInTheory` | boolean | Aun en la linea principal |
| `theoryMoveIndex` | number | Ultima jugada de teoria completada |
| `deviationInfo` | object\|null | Info del desvio (`{moveIndex, expectedMove, playedMove}`) |
| `moveEvaluations` | Map | Evaluaciones por indice de jugada |
| `isEngineThinking` | boolean | Motor calculando respuesta |
| `isEvaluating` | boolean | Evaluando jugada del usuario |
| `pendingFeedback` | object\|null | Feedback de la ultima jugada |
| `engineStrength` | number | Skill Level (0-20) |
| `sessionSummary` | object\|null | Resumen al finalizar |

**Acciones**:
| Funcion | Descripcion |
|---------|-------------|
| `startSession(opening)` | Iniciar sesion con una apertura |
| `makeTrainerMove(from, to, promo)` | Jugar jugada (evalua + motor responde) |
| `endSession()` | Finalizar y calcular resumen |
| `abandonSession()` | Volver al selector |
| `setEngineStrength(level)` | Cambiar nivel del motor |
| `clearFeedback()` | Limpiar feedback pendiente |
| `getTheoryPreview()` | Proximas jugadas de teoria |

**Estado interno**:
- `sessionId` (counter) — se incrementa en cada start/restart para re-disparar effects
- `gameRef` (chess.js) — instancia propia, no usa useChessGame
- `theoryIndexRef` — posicion actual en la linea principal

---

## useTrainerEngine

**Proposito**: Instancia dedicada de Stockfish para el entrenador con task queue.

**Retorna**:
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| `isReady` | boolean | Worker listo |

**Acciones**:
| Funcion | Descripcion |
|---------|-------------|
| `getEngineMove(fen, skillLevel)` | Obtener jugada del motor |
| `evaluateMove(fenBefore, fenAfter)` | Evaluar jugada (retorna `{classification, scoreDiff, bestMoveUci}`) |

**Internos**: Cola de tareas para evitar enviar comandos al worker mientras esta ocupado. Configura Skill Level via UCI.

---

## useTrainerLLM

**Proposito**: Hook ligero de LLM para el entrenador (feedback por jugada y summary).

**Retorna**:
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| `narrative` | string | Texto generado |
| `isAnalyzing` | boolean | Streaming activo |
| `error` | string\|null | Error del provider |
| `providerStatus` | object | Disponibilidad de providers |

**Acciones**:
| Funcion | Descripcion |
|---------|-------------|
| `analyze(prompt, {promptVersion})` | Analizar con SSE streaming |
| `clear()` | Abortar y limpiar |
| `checkHealth()` | Verificar providers |

**Notas**: Lee provider/model de localStorage (compartido con el analizador). Si el provider es Ollama, cae a Claude Haiku. Hace health check al montarse.

---

## useTrainerData

**Proposito**: Persistencia de sesiones y estadisticas en localStorage.

**Retorna**:
| Funcion | Descripcion |
|---------|-------------|
| `saveSession(summary)` | Guardar sesion completada (max 50) |
| `getOpeningStats(openingId)` | Stats por apertura (`{played, avgAccuracy, avgTheoryDepth, lastPlayed}`) |
