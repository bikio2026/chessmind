import { cors } from './_shared.js'

export default function handler(req, res) {
  cors(res)

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  res.status(503).json({
    error: 'Ollama no está disponible en la versión online. Seleccioná Claude o Groq como provider.'
  })
}
