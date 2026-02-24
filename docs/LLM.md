# Integracion LLM

## Providers

| Provider | Modelos | Velocidad | Costo | Notas |
|----------|---------|-----------|-------|-------|
| **Claude** | Haiku 4.5, Sonnet 4, Sonnet 4.5 | Media | Con creditos | Mejor calidad ajedrecistica |
| **Groq** | Llama 3.3 70B, Llama 3.1 8B | Rapida | Gratis (rate limited) | Buena relacion velocidad/calidad |
| **Ollama** | Cualquier modelo local | Variable | Gratis | Solo en desarrollo (localhost) |

## Configuracion

### Claude
1. Obtener API key en [console.anthropic.com](https://console.anthropic.com/settings/keys)
2. Agregar a `.env`: `ANTHROPIC_API_KEY=sk-ant-...`

### Groq
1. Obtener API key gratis en [console.groq.com](https://console.groq.com/keys)
2. Agregar a `.env`: `GROQ_API_KEY=gsk_...`

### Ollama (solo local)
1. Instalar Ollama: `brew install ollama`
2. Descargar modelo: `ollama pull llama3.2`
3. Iniciar server: `ollama serve` (o usar el boton en la UI)

---

## System Prompts

### v1 — Base (analizador)
```
GM comentarista de ajedrez. Espanol rioplatense. MAXIMO 3-4 oraciones, ~80 palabras.
Un parrafo. Sin listas, sin markdown.
Usa los datos del motor como base pero NO los repitas. Construi una narrativa sobre
IDEAS y PLANES. Cada oracion debe aportar insight que un jugador de club no veria solo.
```

### v2 — Few-shot (analizador)
Mismo que v1 pero con 3 ejemplos modelo:
- Apertura (Siciliana Najdorf)
- Medio juego (alfiles vs caballos)
- Final (torres con peon de ventaja)

### trainer — Feedback por jugada (entrenador)
```
Instructor de ajedrez. Espanol rioplatense. ESTRICTO: maximo 2 oraciones, 40-60 palabras.
Un solo parrafo. Sin listas, sin markdown, sin titulos.
Explica la CONSECUENCIA CONCRETA de la jugada: que se pierde, que se deja de ganar,
o que se logra. Usa variantes cortas cuando sea util.
```

### trainerSummary — Resumen de sesion (entrenador)
```
Entrenador de ajedrez. Espanol rioplatense. MAXIMO 4-5 oraciones, ~100 palabras.
Un solo parrafo. Sin listas, sin markdown, sin titulos.
Genera un resumen motivador pero honesto de la sesion. Menciona puntos fuertes,
el error mas importante, y una recomendacion concreta.
```

---

## Flujo SSE (Server-Sent Events)

### Frontend → API
```
POST /api/analyze-claude
Content-Type: application/json

{
  "prompt": "Posicion: rnbqkbnr/... Evalua la posicion.",
  "model": "claude-haiku-4-5-20251001",
  "promptVersion": "v2"
}
```

### API → Frontend (streaming)
```
data: {"token": "Las blancas "}
data: {"token": "tienen una "}
data: {"token": "ligera ventaja"}
data: {"done": true}
```

### Parsing en el frontend
```js
const reader = res.body.getReader()
const decoder = new TextDecoder()
let fullText = ''

while (true) {
  const { done, value } = await reader.read()
  if (done) break
  const chunk = decoder.decode(value, { stream: true })
  const lines = chunk.split('\n').filter(l => l.startsWith('data: '))
  for (const line of lines) {
    const json = JSON.parse(line.slice(6))
    if (json.token) {
      fullText += json.token
      setNarrative(fullText)
    }
  }
}
```

---

## Caching

**Analizador** (`useSemanticAnalysis`):
- Cache key: `${provider}:${promptVersion}:${fen}`
- Cache en memoria (Map), por sesion
- Debounce: 2 segundos

**Entrenador** (`useTrainerLLM`):
- Sin cache (cada jugada es unica)
- Tracking por `analysisKey` = `${moveIndex}:${provider}:${model}` para evitar re-analisis de la misma jugada con el mismo modelo

---

## Agregar un provider nuevo

1. **Server** (`server/index.js`): agregar endpoint `POST /api/analyze-<provider>` con SSE
2. **Vercel** (`api/analyze-<provider>.js`): misma logica en CommonJS
3. **Health** (`server/index.js` + `api/health.js`): agregar check en `/api/health`
4. **Shared** (`api/_shared.js`): agregar system prompt si necesario
5. **Frontend** (`LLMSelector.jsx`): agregar seccion con modelos
6. **Hook** (`useSemanticAnalysis.js` + `useTrainerLLM.js`): agregar routing al endpoint

Los providers deben emitir SSE con formato `data: {"token": "..."}` por consistencia.
