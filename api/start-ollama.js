import { cors } from './_shared.js'

export default function handler(req, res) {
  cors(res)

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  res.status(503).json({
    status: 'error',
    message: 'Ollama no está disponible en la versión online.'
  })
}
