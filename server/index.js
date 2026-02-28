import http from 'node:http'
import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'

// Load .env manually — Node's --env-file won't override vars already in the environment
// (Claude Code sets ANTHROPIC_API_KEY="" which blocks the .env value)
try {
  const envContent = readFileSync(new URL('../.env', import.meta.url), 'utf8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx)
    const val = trimmed.slice(eqIdx + 1)
    process.env[key] = val
  }
} catch { /* .env not found — OK, Claude just won't be available */ }

const PORT = 3056
const OLLAMA_URL = 'http://localhost:11434'
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
const ANTHROPIC_VERSION = '2023-06-01'

let ollamaProcess = null

const SYSTEM_PROMPTS = {
  v1: `GM comentarista de ajedrez. Español rioplatense. MÁXIMO 3-4 oraciones, ~80 palabras. Un párrafo. Sin listas, sin markdown.

Usá los datos del motor como base pero NO los repitas. Construí una narrativa sobre IDEAS y PLANES. Cada oración debe aportar insight que un jugador de club no vería solo. Si hay ventaja decisiva, explicá POR QUÉ. NUNCA digas "igualado" en aperturas. NUNCA hables de centro en finales. NUNCA hables de apertura en medio juego o finales — enfocate en la fase actual.`,

  v2: `GM comentarista de ajedrez. Español rioplatense. MÁXIMO 3-4 oraciones, ~80 palabras. Un párrafo. Sin listas, sin markdown.

Usá los datos del motor como base pero NO los repitas. Construí una narrativa sobre IDEAS y PLANES. Cada oración debe aportar insight que un jugador de club no vería solo. Si hay ventaja decisiva, explicá POR QUÉ. NUNCA digas "igualado" en aperturas. NUNCA hables de centro en finales. NUNCA hables de apertura en medio juego o finales — enfocate en la fase actual.

EJEMPLOS del estilo y nivel que espero:

APERTURA (después de 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6):
"Siciliana Najdorf, la línea más combativa contra 1.e4. Con ...a6 las negras preparan la expansión con ...e5 o ...b5 manteniendo máxima flexibilidad. Las blancas eligen entre líneas posicionales (6.Ae2) o agudas (6.Ag5, 6.f3), cada una con carácter completamente distinto."

MEDIO JUEGO (posición con alfiles vs caballos, estructura cerrada):
"Las blancas tienen el par de alfiles pero la estructura cerrada favorece los caballos negros, especialmente el clavado en d5 que controla casillas clave. La ruptura f4 es la única forma de abrir la posición y activar los alfiles — si las negras consolidan con ...Ae7 y ...O-O primero, la ventaja pasa a su favor."

FINAL (torres con peón de ventaja en flanco de rey):
"Final de torres técnicamente ganable: la clave es llevar el rey a f5 apoyando el peón pasado mientras la torre corta al rey negro en la columna c. Si las blancas logran el peón en séptima con el rey cerca, es Lucena y ganan; si las negras activan la torre lateralmente a tiempo, defienden por Philidor."`,

  trainer: `Instructor de ajedrez. Español rioplatense. ESTRICTO: máximo 2 oraciones, 40-60 palabras. Un solo párrafo. Sin listas, sin markdown, sin títulos.

Explicá la CONSECUENCIA CONCRETA de la jugada: qué se pierde, qué se deja de ganar, o qué se logra. Usá variantes cortas cuando sea útil ("si ...Te8 entonces Cd5 gana material"). No repitas los datos del prompt. Sé conciso: si sobrepasás 60 palabras, fallaste.`,

  trainerSummary: `Entrenador de ajedrez. Español rioplatense. MÁXIMO 4-5 oraciones, ~100 palabras. Un solo párrafo. Sin listas, sin markdown, sin títulos.

Generá un resumen motivador pero honesto de la sesión. Mencioná puntos fuertes, el error más importante con una explicación breve, y una recomendación concreta para la próxima sesión. Hablale directamente al alumno usando "vos". No repitas los datos crudos del prompt.`,

  hint: `Instructor de ajedrez dando pistas. Español rioplatense. ESTRICTO: 1-2 oraciones, 20-40 palabras. Sin listas, sin markdown.

Describí la IDEA ESTRATÉGICA o TÁCTICA detrás de la mejor jugada. PROHIBIDO nombrar la jugada, la casilla de destino, o la pieza exacta que se mueve. Usá conceptos generales: "mejorá tu peor pieza", "hay una debilidad táctica en el flanco de rey", "buscá una ruptura en el centro". Sé concreto en el concepto pero vago en la ejecución.`,
}

function getSystemPrompt(version) {
  return SYSTEM_PROMPTS[version] || SYSTEM_PROMPTS.v1
}

const CLAUDE_MODELS = [
  { id: 'claude-haiku-4-5-20251001', name: 'Haiku 4.5', speed: 'rápido' },
  { id: 'claude-sonnet-4-20250514', name: 'Sonnet 4', speed: 'equilibrado' },
  { id: 'claude-sonnet-4-5-20250929', name: 'Sonnet 4.5', speed: 'preciso' },
]

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODELS = [
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', speed: 'rápido' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', speed: 'ultra rápido' },
]

function sseHeaders(res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  })
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => resolve(body))
  })
}

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  // Health check — reports both Ollama and Claude availability
  if (req.url === '/api/health' && req.method === 'GET') {
    const result = {
      ollama: { available: false, models: [] },
      claude: { available: false, models: [] },
      groq: { available: false, models: [] },
    }

    // Check Ollama
    try {
      const ollamaRes = await fetch(`${OLLAMA_URL}/api/tags`)
      if (ollamaRes.ok) {
        const data = await ollamaRes.json()
        result.ollama.available = true
        result.ollama.models = data.models?.map(m => m.name) || []
      }
    } catch { /* not available */ }

    // Check Claude (API key present)
    if (process.env.ANTHROPIC_API_KEY) {
      result.claude.available = true
      result.claude.models = CLAUDE_MODELS.map(m => m.id)
    }

    // Check Groq (API key present)
    if (process.env.GROQ_API_KEY) {
      result.groq.available = true
      result.groq.models = GROQ_MODELS.map(m => m.id)
    }

    const status = result.ollama.available || result.claude.available || result.groq.available ? 'ok' : 'error'
    res.writeHead(status === 'ok' ? 200 : 503, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status, ...result }))
    return
  }

  // Analyze with Ollama — streaming
  if (req.url === '/api/analyze' && req.method === 'POST') {
    const body = await readBody(req)
    try {
      const { prompt, model = 'llama3.2', promptVersion = 'v1' } = JSON.parse(body)
      const systemPrompt = getSystemPrompt(promptVersion)

      const ollamaRes = await fetch(`${OLLAMA_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt },
          ],
          stream: true,
          options: { num_predict: 300 },
        }),
      })

      if (!ollamaRes.ok) {
        res.writeHead(502, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Ollama returned error' }))
        return
      }

      sseHeaders(res)
      const reader = ollamaRes.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(Boolean)
        for (const line of lines) {
          try {
            const json = JSON.parse(line)
            if (json.message?.content) {
              res.write(`data: ${JSON.stringify({ token: json.message.content })}\n\n`)
            }
            if (json.done) {
              res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
            }
          } catch { /* skip malformed */ }
        }
      }

      res.end()
    } catch (err) {
      console.error('Ollama analyze error:', err.message)
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: err.message }))
      } else {
        res.end()
      }
    }
    return
  }

  // Analyze with Claude API — streaming
  if (req.url === '/api/analyze-claude' && req.method === 'POST') {
    const body = await readBody(req)
    try {
      const { prompt, model = 'claude-haiku-4-5-20251001', promptVersion = 'v1' } = JSON.parse(body)
      const systemPrompt = getSystemPrompt(promptVersion)
      const apiKey = process.env.ANTHROPIC_API_KEY

      if (!apiKey) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY no configurada. Agregala al archivo .env' }))
        return
      }

      const claudeRes = await fetch(ANTHROPIC_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': ANTHROPIC_VERSION,
        },
        body: JSON.stringify({
          model,
          max_tokens: 1024,
          stream: true,
          system: systemPrompt,
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      if (!claudeRes.ok) {
        const errText = await claudeRes.text()
        console.error('Claude API error:', claudeRes.status, errText)
        res.writeHead(claudeRes.status, { 'Content-Type': 'application/json' })
        let detail = ''
        try { detail = JSON.parse(errText).error?.message || errText.slice(0, 200) } catch { detail = errText.slice(0, 200) }
        res.end(JSON.stringify({ error: `Claude API (${claudeRes.status}): ${detail}` }))
        return
      }

      sseHeaders(res)
      const reader = claudeRes.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() // keep incomplete line in buffer

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') continue

          try {
            const json = JSON.parse(data)

            // Claude SSE events: content_block_delta has the text tokens
            if (json.type === 'content_block_delta' && json.delta?.text) {
              res.write(`data: ${JSON.stringify({ token: json.delta.text })}\n\n`)
            }

            // message_stop signals completion
            if (json.type === 'message_stop') {
              res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
            }
          } catch { /* skip malformed */ }
        }
      }

      // Ensure done signal is sent
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
      res.end()
    } catch (err) {
      console.error('Claude analyze error:', err.message)
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: err.message }))
      } else {
        res.end()
      }
    }
    return
  }

  // Analyze with Groq API — streaming (OpenAI-compatible)
  if (req.url === '/api/analyze-groq' && req.method === 'POST') {
    const body = await readBody(req)
    try {
      const { prompt, model = 'llama-3.3-70b-versatile', promptVersion = 'v1' } = JSON.parse(body)
      const systemPrompt = getSystemPrompt(promptVersion)
      const apiKey = process.env.GROQ_API_KEY

      if (!apiKey) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'GROQ_API_KEY no configurada. Obtené una gratis en console.groq.com y agregala al archivo .env' }))
        return
      }

      const groqRes = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          max_tokens: 300,
          stream: true,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt },
          ],
        }),
      })

      if (!groqRes.ok) {
        const errText = await groqRes.text()
        console.error('Groq API error:', groqRes.status, errText)
        res.writeHead(groqRes.status, { 'Content-Type': 'application/json' })
        let detail = ''
        try { detail = JSON.parse(errText).error?.message || errText.slice(0, 200) } catch { detail = errText.slice(0, 200) }
        res.end(JSON.stringify({ error: `Groq API (${groqRes.status}): ${detail}` }))
        return
      }

      sseHeaders(res)
      const reader = groqRes.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') {
            res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
            continue
          }

          try {
            const json = JSON.parse(data)
            const content = json.choices?.[0]?.delta?.content
            if (content) {
              res.write(`data: ${JSON.stringify({ token: content })}\n\n`)
            }
          } catch { /* skip malformed */ }
        }
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
      res.end()
    } catch (err) {
      console.error('Groq analyze error:', err.message)
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: err.message }))
      } else {
        res.end()
      }
    }
    return
  }

  // Start Ollama
  if (req.url === '/api/start-ollama' && req.method === 'POST') {
    try {
      const check = await fetch(`${OLLAMA_URL}/api/tags`)
      if (check.ok) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 'already_running' }))
        return
      }
    } catch { /* not running */ }

    try {
      if (ollamaProcess) {
        try { ollamaProcess.kill() } catch {}
        ollamaProcess = null
      }

      ollamaProcess = spawn('ollama', ['serve'], {
        detached: true,
        stdio: 'ignore',
      })
      ollamaProcess.unref()
      ollamaProcess.on('error', (err) => {
        console.error('Failed to start Ollama:', err.message)
        ollamaProcess = null
      })

      await new Promise(r => setTimeout(r, 2000))

      const verify = await fetch(`${OLLAMA_URL}/api/tags`)
      if (verify.ok) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 'started' }))
      } else {
        throw new Error('Not responding after start')
      }
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: 'error', message: 'Ollama no respondió después de iniciar. Verificá que esté instalado.' }))
    }
    return
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(PORT, () => {
  console.log(`ChessMind API proxy running on http://localhost:${PORT}`)
  console.log(`Ollama target: ${OLLAMA_URL}`)
  console.log(`Claude API: ${process.env.ANTHROPIC_API_KEY ? 'configured' : 'not configured (set ANTHROPIC_API_KEY in .env)'}`)
  console.log(`Groq API: ${process.env.GROQ_API_KEY ? 'configured' : 'not configured (set GROQ_API_KEY in .env)'}`)
})
