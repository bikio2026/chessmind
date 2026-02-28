const { cors, readBody } = require('./_shared.js')

/**
 * Lichess API proxy — avoids CORS issues from the browser.
 * POST /api/lichess
 * Body: { action: 'playerGames', params: { username, max } }
 */
module.exports = async function handler(req, res) {
  cors(res)

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const raw = typeof req.body === 'string' ? req.body : await readBody(req)
    const { action, params } = JSON.parse(raw)

    if (action === 'playerGames') {
      const { username, max = 20 } = params || {}
      if (!username) {
        res.status(400).json({ error: 'Username requerido' })
        return
      }

      const safeUser = encodeURIComponent(username.trim())
      const url = `https://lichess.org/api/games/user/${safeUser}?max=${max}&perfType=classical,rapid&rated=true&opening=true&pgnInJson=true`

      const lichessRes = await fetch(url, {
        headers: {
          'Accept': 'application/x-ndjson',
        },
      })

      if (!lichessRes.ok) {
        const text = await lichessRes.text()
        res.status(lichessRes.status).json({ error: text || `Lichess error ${lichessRes.status}` })
        return
      }

      const text = await lichessRes.text()
      const games = text.trim().split('\n').filter(Boolean).map(line => {
        try {
          const g = JSON.parse(line)
          return {
            white: g.players?.white?.user?.name || 'Anon',
            black: g.players?.black?.user?.name || 'Anon',
            whiteElo: g.players?.white?.rating,
            blackElo: g.players?.black?.rating,
            result: g.winner === 'white' ? '1-0' : g.winner === 'black' ? '0-1' : '1/2-1/2',
            opening: g.opening?.name || '',
            eco: g.opening?.eco || '',
            speed: g.speed || '',
            date: g.createdAt ? new Date(g.createdAt).toISOString().slice(0, 10) : '',
            pgn: g.pgn || '',
          }
        } catch {
          return null
        }
      }).filter(Boolean)

      res.status(200).json({ games })
    } else {
      res.status(400).json({ error: `Acción desconocida: ${action}` })
    }
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error interno' })
  }
}
