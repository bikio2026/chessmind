# ChessMind — Analizador Semántico de Ajedrez

## Stack
- Vite 7 + React 19 + JavaScript + Tailwind v4 (CSS-based)
- chess.js 1.4 + Stockfish WASM 18 + react-chessboard 5
- Ollama (localhost:11434) con llama3.2 para análisis semántico

## Puertos
- **3055**: Frontend (Vite)
- **3056**: API proxy (Node.js HTTP → Ollama)

## Comandos
```bash
npm run dev      # Frontend + API juntos
npm run client   # Solo frontend
npm run server   # Solo API proxy
npm run build    # Build producción
```

## Arquitectura
```
src/
  hooks/useChessGame.js         — Estado del juego (chess.js)
  hooks/useStockfish.js         — Motor WASM via Web Worker
  hooks/usePositionAnalysis.js  — Heurísticas posicionales
  hooks/useSemanticAnalysis.js  — Streaming Ollama
  lib/heuristics.js             — Funciones puras de análisis
  lib/promptBuilder.js          — Constructor de prompts
  lib/stockfishParser.js        — Parser UCI
  components/                   — UI components
server/index.js                 — Proxy HTTP → Ollama
```

## Requisitos
- Ollama instalado y corriendo: `ollama serve`
- Modelo: `ollama pull llama3.2`
- Si Ollama no está disponible, la app funciona sin análisis semántico

## Notas
- Stockfish WASM en public/ (copiado de node_modules/stockfish/bin/)
- Piezas custom via prop customPieces de react-chessboard
- El análisis semántico usa debounce de 2s y cache por FEN
