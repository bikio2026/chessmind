/**
 * Parse a UCI "info" line from Stockfish
 * Example: "info depth 18 seldepth 24 multipv 1 score cp 35 wdl 411 318 271 nodes 1234 nps 456789 pv e2e4 e7e5 g1f3"
 */
export function parseInfoLine(line) {
  if (!line.startsWith('info')) return null

  const result = {
    depth: 0,
    seldepth: 0,
    multipv: 1,
    score: null, // { type: 'cp' | 'mate', value: number }
    wdl: null, // { win: number, draw: number, loss: number }
    nodes: 0,
    nps: 0,
    pv: [], // array of UCI moves (e2e4 format)
  }

  const tokens = line.split(/\s+/)
  let i = 1 // skip "info"

  while (i < tokens.length) {
    switch (tokens[i]) {
      case 'depth':
        result.depth = parseInt(tokens[++i])
        break
      case 'seldepth':
        result.seldepth = parseInt(tokens[++i])
        break
      case 'multipv':
        result.multipv = parseInt(tokens[++i])
        break
      case 'score':
        i++
        if (tokens[i] === 'cp') {
          result.score = { type: 'cp', value: parseInt(tokens[++i]) }
        } else if (tokens[i] === 'mate') {
          result.score = { type: 'mate', value: parseInt(tokens[++i]) }
        }
        break
      case 'wdl':
        result.wdl = {
          win: parseInt(tokens[++i]),
          draw: parseInt(tokens[++i]),
          loss: parseInt(tokens[++i]),
        }
        break
      case 'nodes':
        result.nodes = parseInt(tokens[++i])
        break
      case 'nps':
        result.nps = parseInt(tokens[++i])
        break
      case 'pv':
        result.pv = tokens.slice(i + 1)
        i = tokens.length // pv is always last
        break
      default:
        break
    }
    i++
  }

  return result
}

/**
 * Parse a "bestmove" line
 * Example: "bestmove e2e4 ponder e7e5"
 */
export function parseBestMove(line) {
  if (!line.startsWith('bestmove')) return null
  const tokens = line.split(/\s+/)
  return {
    bestMove: tokens[1],
    ponder: tokens[3] || null,
  }
}

/**
 * Convert a score to display string
 */
export function formatScore(score) {
  if (!score) return '...'
  if (score.type === 'mate') {
    return `M${Math.abs(score.value)}`
  }
  const pawns = score.value / 100
  return `${pawns > 0 ? '+' : ''}${pawns.toFixed(1)}`
}

/**
 * Convert eval to percentage for eval bar (0 = black winning, 100 = white winning)
 */
export function evalToPercentage(score) {
  if (!score) return 50
  if (score.type === 'mate') {
    return score.value > 0 ? 100 : 0
  }
  // Sigmoid function to map centipawns to percentage
  const cp = score.value
  return Math.round(50 + 50 * (2 / (1 + Math.exp(-0.004 * cp)) - 1))
}

/**
 * Convert UCI move (e2e4) to SAN (e4) using a chess.js game instance
 */
export function uciToSan(game, uciMove) {
  if (!uciMove || uciMove.length < 4) return uciMove
  const from = uciMove.slice(0, 2)
  const to = uciMove.slice(2, 4)
  const promotion = uciMove[4] || undefined

  try {
    const move = game.move({ from, to, promotion })
    if (move) {
      const san = move.san
      game.undo()
      return san
    }
  } catch {
    // Invalid move
  }
  return uciMove
}

/**
 * Convert a PV line (array of UCI moves) to SAN notation
 * @param {import('chess.js').Chess} ChessClass - The Chess constructor
 * @param {string} fen - Current position FEN
 * @param {string[]} pvMoves - Array of UCI moves
 * @param {number} maxMoves - Max moves to convert
 */
export function pvToSan(ChessClass, fen, pvMoves, maxMoves = 8) {
  const tempGame = new ChessClass(fen)
  const sanMoves = []

  for (let i = 0; i < Math.min(pvMoves.length, maxMoves); i++) {
    const uci = pvMoves[i]
    if (!uci || uci.length < 4) break
    const from = uci.slice(0, 2)
    const to = uci.slice(2, 4)
    const promotion = uci[4] || undefined

    try {
      const move = tempGame.move({ from, to, promotion })
      if (move) {
        sanMoves.push(move.san)
      } else {
        break
      }
    } catch {
      break
    }
  }

  return sanMoves
}
