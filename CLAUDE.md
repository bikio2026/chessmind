# ChessMind — Analizador Semántico de Ajedrez

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

## Arquitectura
```
src/
  hooks/useChessGame.js         — Estado del juego (chess.js)
  hooks/useStockfish.js         — Motor WASM via Web Worker
  hooks/usePositionAnalysis.js  — Heurísticas posicionales
  hooks/useSemanticAnalysis.js  — Streaming LLM (multi-provider)
  lib/heuristics.js             — Funciones puras de análisis
  lib/promptBuilder.js          — Constructor de prompts (phase-aware)
  lib/promptVersions.js         — Definiciones de versiones de prompt
  lib/stockfishParser.js        — Parser UCI
  components/                   — UI components
server/index.js                 — API proxy local (Ollama + Claude + Groq)
api/
  _shared.js                    — Config compartida, system prompts, CORS
  analyze-claude.js             — Endpoint Claude (Vercel)
  analyze-groq.js               — Endpoint Groq (Vercel)
  health.js                     — Health check proveedores
```

## Providers LLM
- **Ollama**: Local, requiere `ollama serve` + `ollama pull llama3.2`. Gratis pero lento.
- **Claude**: Requiere `ANTHROPIC_API_KEY` en env. Modelos: Haiku 4.5 (rápido), Sonnet 4 (mejor calidad).
- **Groq**: Requiere `GROQ_API_KEY` en env. Modelo: Llama 3.3 70B. Rápido pero menor calidad ajedrecística.

## Prompt Versioning
- **v1 "Base"**: Prompt directo sin ejemplos
- **v2 "Few-shot"**: Con 3 ejemplos modelo (apertura, medio juego, final)
- Selector en UI (SemanticPanel), persiste en localStorage
- Cache key incluye versión: `${provider}:${promptVersion}:${fen}`

## Versión actual
- **post-v1.0**: Prompt versioning (v1 Base + v2 Few-shot) sobre v1.0-stable

## Git Tags
- `v1.0-stable`: Última versión estable antes de prompt versioning (commit 1b0cd4f, 2026-02-22)

## Notas
- Stockfish WASM Lite en `public/` (binarios commiteados, no npm)
- Piezas custom via prop customPieces de react-chessboard
- Análisis semántico usa debounce de 2s y cache por FEN+provider+version
- System prompt: español rioplatense, ~80 palabras, 3-4 oraciones, sin markdown
- max_tokens: 300 para Groq/Ollama, 1024 para Claude
- 16 partidas clásicas precargadas en el menú PGN

---

## Changelog

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
