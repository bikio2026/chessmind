# ChessMind

Analizador semántico de ajedrez con entrenador de aperturas interactivo.

Combiná la potencia de Stockfish con explicaciones en lenguaje natural generadas por LLM para entender **por qué** una jugada es buena o mala.

**[Demo en vivo](https://chessmind-one.vercel.app)**

## Features

- **Analizador de posiciones** — Tablero interactivo con evaluación Stockfish en tiempo real (MultiPV 3, WDL%)
- **Análisis semántico** — Narrativas generadas por LLM que explican ideas, planes y consecuencias
- **Entrenador de aperturas** — Practicá 13 aperturas con feedback por jugada y clasificación automática
- **Multi-provider LLM** — Claude (Haiku/Sonnet), Groq (Llama 3.3 70B), u Ollama (local)
- **Carga de PGN** — 16 partidas clásicas precargadas + carga manual
- **Evaluación por jugada** — Clasificación tipo Lichess (excelente/buena/imprecisión/error/blunder)
- **Resumen de sesión** — Precisión ACPL, momentos clave, narrativa LLM motivadora
- **Responsive** — Funciona en desktop, tablet y mobile

## Stack

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-v4-cyan) ![Stockfish](https://img.shields.io/badge/Stockfish-18_WASM-green)

- **Frontend**: React 19 + Vite 7 + Tailwind CSS v4
- **Tablero**: react-chessboard 5 + chess.js 1.4
- **Motor**: Stockfish 18 WASM Lite (Web Worker)
- **LLM**: Claude API + Groq API + Ollama (local)
- **Deploy**: Vercel (Serverless Functions)

## Quick Start

```bash
# 1. Clonar
git clone https://github.com/bikio2026/chessmind.git
cd chessmind

# 2. Instalar dependencias
npm install

# 3. Configurar API keys
cp .env.example .env
# Editar .env con tus keys (ver abajo)

# 4. Iniciar (frontend + API proxy)
npm run dev
```

Abre [http://localhost:3055](http://localhost:3055).

## Variables de entorno

| Variable | Requerida | Descripcion |
|----------|-----------|-------------|
| `ANTHROPIC_API_KEY` | Para Claude | [Obtener key](https://console.anthropic.com/settings/keys) |
| `GROQ_API_KEY` | Para Llama/Groq | [Obtener key gratis](https://console.groq.com/keys) |

Sin API keys, Stockfish y el tablero funcionan normalmente. Solo el analisis semantico LLM requiere al menos una key.

## Comandos

```bash
npm run dev      # Frontend (Vite :3055) + API proxy (:3056)
npm run client   # Solo frontend
npm run server   # Solo API proxy
npm run build    # Build de produccion
```

## Documentacion

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — Arquitectura y flujos de datos
- [`docs/COMPONENTS.md`](docs/COMPONENTS.md) — Mapa de componentes React
- [`docs/HOOKS.md`](docs/HOOKS.md) — Referencia de custom hooks
- [`docs/LLM.md`](docs/LLM.md) — Providers, prompts y streaming SSE
- [`docs/OPENINGS.md`](docs/OPENINGS.md) — Catalogo de aperturas del entrenador

## License

MIT
