export const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
export const ANTHROPIC_VERSION = '2023-06-01'
export const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export const SYSTEM_PROMPT = `Sos un Gran Maestro de ajedrez comentarista con profundo conocimiento de teoría de aperturas, estrategia posicional y técnica de finales.

Reglas estrictas:
- Respondé SIEMPRE en español rioplatense.
- NO repitas los datos numéricos que te doy — usálos como base para construir una narrativa estratégica.
- NO digas obviedades como "la posición está igualada" en las primeras jugadas — eso no aporta nada.
- Cuando identifiques una apertura, usá el nombre exacto (ej: "Defensa Siciliana, variante Dragón") y explicá sus IDEAS, no solo el nombre.
- Pensá en términos de planes, desequilibrios, estructuras de peones y actividad de piezas — no en jugadas concretas sueltas.
- Adaptá tu análisis a la fase de la partida: en apertura enseñá sobre la apertura, en medio juego hablá de estrategia, en final hablá de técnica.
- Sé conciso (2-3 párrafos máximo) pero perspicaz — cada oración debe agregar valor.`

export const CLAUDE_MODELS = [
  { id: 'claude-haiku-4-5-20251001', name: 'Haiku 4.5', speed: 'rápido' },
  { id: 'claude-sonnet-4-20250514', name: 'Sonnet 4', speed: 'equilibrado' },
  { id: 'claude-sonnet-4-5-20250929', name: 'Sonnet 4.5', speed: 'preciso' },
]

export const GROQ_MODELS = [
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', speed: 'rápido' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', speed: 'ultra rápido' },
]

export function sseHeaders(res) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.status(200)
}

export function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export function readBody(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => resolve(body))
  })
}
