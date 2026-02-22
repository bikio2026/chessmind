const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
const ANTHROPIC_VERSION = '2023-06-01'
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

const SYSTEM_PROMPTS = {
  v1: `GM comentarista de ajedrez. Español rioplatense. MÁXIMO 3-4 oraciones, ~80 palabras. Un párrafo. Sin listas, sin markdown.

Usá los datos del motor como base pero NO los repitas. Construí una narrativa sobre IDEAS y PLANES. Cada oración debe aportar insight que un jugador de club no vería solo. Si hay ventaja decisiva, explicá POR QUÉ. NUNCA digas "igualado" en aperturas. NUNCA hables de centro en finales.`,

  v2: `GM comentarista de ajedrez. Español rioplatense. MÁXIMO 3-4 oraciones, ~80 palabras. Un párrafo. Sin listas, sin markdown.

Usá los datos del motor como base pero NO los repitas. Construí una narrativa sobre IDEAS y PLANES. Cada oración debe aportar insight que un jugador de club no vería solo. Si hay ventaja decisiva, explicá POR QUÉ. NUNCA digas "igualado" en aperturas. NUNCA hables de centro en finales.

EJEMPLOS del estilo y nivel que espero:

APERTURA (después de 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6):
"Siciliana Najdorf, la línea más combativa contra 1.e4. Con ...a6 las negras preparan la expansión con ...e5 o ...b5 manteniendo máxima flexibilidad. Las blancas eligen entre líneas posicionales (6.Ae2) o agudas (6.Ag5, 6.f3), cada una con carácter completamente distinto."

MEDIO JUEGO (posición con alfiles vs caballos, estructura cerrada):
"Las blancas tienen el par de alfiles pero la estructura cerrada favorece los caballos negros, especialmente el clavado en d5 que controla casillas clave. La ruptura f4 es la única forma de abrir la posición y activar los alfiles — si las negras consolidan con ...Ae7 y ...O-O primero, la ventaja pasa a su favor."

FINAL (torres con peón de ventaja en flanco de rey):
"Final de torres técnicamente ganable: la clave es llevar el rey a f5 apoyando el peón pasado mientras la torre corta al rey negro en la columna c. Si las blancas logran el peón en séptima con el rey cerca, es Lucena y ganan; si las negras activan la torre lateralmente a tiempo, defienden por Philidor."`,
}

function getSystemPrompt(version) {
  return SYSTEM_PROMPTS[version] || SYSTEM_PROMPTS.v1
}

// Keep backwards compatibility
const SYSTEM_PROMPT = SYSTEM_PROMPTS.v1

const CLAUDE_MODELS = [
  { id: 'claude-haiku-4-5-20251001', name: 'Haiku 4.5', speed: 'rápido' },
  { id: 'claude-sonnet-4-20250514', name: 'Sonnet 4', speed: 'equilibrado' },
  { id: 'claude-sonnet-4-5-20250929', name: 'Sonnet 4.5', speed: 'preciso' },
]

const GROQ_MODELS = [
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', speed: 'rápido' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', speed: 'ultra rápido' },
]

function sseHeaders(res) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.status(200)
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => resolve(body))
  })
}

module.exports = {
  ANTHROPIC_API_URL,
  ANTHROPIC_VERSION,
  GROQ_API_URL,
  SYSTEM_PROMPT,
  SYSTEM_PROMPTS,
  getSystemPrompt,
  CLAUDE_MODELS,
  GROQ_MODELS,
  sseHeaders,
  cors,
  readBody,
}
