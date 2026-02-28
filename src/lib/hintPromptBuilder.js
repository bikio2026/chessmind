/**
 * Prompt builder for Training Mode hints.
 * Generates conceptual hints that describe the strategic idea
 * behind the best move WITHOUT revealing the move itself.
 */

import { Chess } from 'chess.js'
import { detectPhase, buildHeuristicsBlock, formatMoveHistory } from './promptBuilder'

const PIECE_NAMES = { p: 'peón', n: 'caballo', b: 'alfil', r: 'torre', q: 'dama', k: 'rey' }

/**
 * Pre-compute factual data about a threat move using chess.js.
 * Provides ground truth to anchor LLM analysis and prevent hallucinations.
 */
export function analyzeThreatMove(fen, threatMoveSan) {
  try {
    // Flip turn to play the threat from opponent's perspective
    const parts = fen.split(' ')
    parts[1] = parts[1] === 'w' ? 'b' : 'w'
    parts[3] = '-'
    const nullFen = parts.join(' ')

    const game = new Chess(nullFen)
    const move = game.move(threatMoveSan)
    if (!move) return null

    const movedPiece = PIECE_NAMES[move.piece] || move.piece
    const lines = []

    // Capture?
    if (move.captured) {
      lines.push(`Captura: sí (captura ${PIECE_NAMES[move.captured] || move.captured} en ${move.to})`)
    } else {
      lines.push('Captura: no')
    }

    // Check?
    if (game.isCheck()) {
      lines.push('Jaque: sí')
    }

    // What squares does the piece attack after moving?
    const attacked = getAttackedSquares(game, move.to, move.color)
    if (attacked.length > 0) {
      // Find if any attacked square has an opponent piece
      const threats = []
      for (const sq of attacked) {
        const target = game.get(sq)
        if (target && target.color !== move.color) {
          threats.push(`${PIECE_NAMES[target.type]} en ${sq}`)
        }
      }
      if (threats.length > 0) {
        lines.push(`Piezas amenazadas tras la jugada: ${threats.join(', ')}`)
      }
    }

    // Pin detection: only line pieces (b, r, q) can pin
    if (['b', 'r', 'q'].includes(move.piece)) {
      const pinInfo = detectPin(game, move.to, move.color)
      if (pinInfo) {
        lines.push(`Clavada: sí (${PIECE_NAMES[move.piece]} clava ${pinInfo})`)
      }
    }

    return {
      movedPiece,
      from: move.from,
      to: move.to,
      dataBlock: `DATOS VERIFICADOS de la jugada ${threatMoveSan}:\n${lines.map(l => `- ${l}`).join('\n')}`
    }
  } catch {
    return null
  }
}

/**
 * Get squares attacked by a piece on a given square.
 */
function getAttackedSquares(game, square, color) {
  const attacked = []
  const files = 'abcdefgh'
  for (let f = 0; f < 8; f++) {
    for (let r = 1; r <= 8; r++) {
      const target = `${files[f]}${r}`
      if (target === square) continue
      // Check if the piece could move there (attack)
      // We use a temporary board check via moves
      try {
        const piece = game.get(square)
        if (!piece) continue
        // For pawns, attacks are diagonal only (not forward moves)
        if (piece.type === 'p') {
          const dir = piece.color === 'w' ? 1 : -1
          const sf = files.indexOf(square[0])
          const sr = parseInt(square[1])
          if (Math.abs(f - sf) === 1 && parseInt(target[1]) === sr + dir) {
            attacked.push(target)
          }
          continue
        }
        // For other pieces, check if the square is in their attack range
        if (canAttack(piece.type, square, target, game)) {
          attacked.push(target)
        }
      } catch { /* skip */ }
    }
  }
  return attacked
}

/**
 * Check if a piece type can attack from source to target.
 */
function canAttack(pieceType, from, to, game) {
  const fc = from.charCodeAt(0) - 97, fr = parseInt(from[1])
  const tc = to.charCodeAt(0) - 97, tr = parseInt(to[1])
  const df = tc - fc, dr = tr - fr

  if (pieceType === 'n') {
    return (Math.abs(df) === 1 && Math.abs(dr) === 2) || (Math.abs(df) === 2 && Math.abs(dr) === 1)
  }
  if (pieceType === 'k') {
    return Math.abs(df) <= 1 && Math.abs(dr) <= 1
  }

  // Line pieces: check direction + path clear
  const isDiagonal = Math.abs(df) === Math.abs(dr) && df !== 0
  const isStraight = (df === 0 || dr === 0) && (df !== 0 || dr !== 0)

  if (pieceType === 'b' && !isDiagonal) return false
  if (pieceType === 'r' && !isStraight) return false
  if (pieceType === 'q' && !isDiagonal && !isStraight) return false

  if (!isDiagonal && !isStraight) return false

  // Check path is clear
  const stepF = df === 0 ? 0 : df > 0 ? 1 : -1
  const stepR = dr === 0 ? 0 : dr > 0 ? 1 : -1
  let cf = fc + stepF, cr = fr + stepR
  const files = 'abcdefgh'
  while (cf !== tc || cr !== tr) {
    const sq = `${files[cf]}${cr}`
    if (game.get(sq)) return false // path blocked
    cf += stepF
    cr += stepR
  }
  return true
}

/**
 * Detect if a line piece on 'square' creates a pin against the opponent's king.
 */
function detectPin(game, square, pieceColor) {
  const piece = game.get(square)
  if (!piece || !['b', 'r', 'q'].includes(piece.type)) return null

  const opponentColor = pieceColor === 'w' ? 'b' : 'w'
  const files = 'abcdefgh'
  const fc = square.charCodeAt(0) - 97, fr = parseInt(square[1])

  // Find opponent king
  let kingSquare = null
  for (let f = 0; f < 8; f++) {
    for (let r = 1; r <= 8; r++) {
      const sq = `${files[f]}${r}`
      const p = game.get(sq)
      if (p && p.type === 'k' && p.color === opponentColor) {
        kingSquare = sq
        break
      }
    }
    if (kingSquare) break
  }
  if (!kingSquare) return null

  const kc = kingSquare.charCodeAt(0) - 97, kr = parseInt(kingSquare[1])
  const df = kc - fc, dr = kr - fr

  // Check if piece is aligned with king
  const isDiagonal = Math.abs(df) === Math.abs(dr) && df !== 0
  const isStraight = (df === 0 || dr === 0) && (df !== 0 || dr !== 0)

  if (piece.type === 'b' && !isDiagonal) return null
  if (piece.type === 'r' && !isStraight) return null
  if (piece.type === 'q' && !isDiagonal && !isStraight) return null

  // Walk from piece toward king, looking for exactly one opponent piece in between
  const stepF = df === 0 ? 0 : df > 0 ? 1 : -1
  const stepR = dr === 0 ? 0 : dr > 0 ? 1 : -1
  let cf = fc + stepF, cr = fr + stepR
  let pinnedPiece = null
  let pinnedSquare = null

  while (cf !== kc || cr !== kr) {
    const sq = `${files[cf]}${cr}`
    const p = game.get(sq)
    if (p) {
      if (p.color === opponentColor && !pinnedPiece) {
        pinnedPiece = p
        pinnedSquare = sq
      } else {
        return null // more than one piece or friendly piece blocks
      }
    }
    cf += stepF
    cr += stepR
  }

  if (pinnedPiece) {
    return `${PIECE_NAMES[pinnedPiece.type]} en ${pinnedSquare} contra el rey`
  }
  return null
}

/**
 * Build a hint prompt for conceptual LLM guidance.
 *
 * @param {Object} params
 * @param {string} params.fen - Current position FEN
 * @param {string} params.turn - 'w' or 'b'
 * @param {Object} params.heuristics - Position analysis from usePositionAnalysis
 * @param {string} params.bestMoveSan - Best move in SAN (e.g., "Nf5") — used internally, NOT to be revealed
 * @param {Array}  params.fullHistory - Move history array [{san}, ...]
 */
export function buildHintPrompt({ fen, turn, heuristics, bestMoveSan, fullHistory }) {
  const turnName = turn === 'w' ? 'Blancas' : 'Negras'
  const moveNumber = fullHistory ? Math.floor(fullHistory.length / 2) + 1 : 1
  const phase = detectPhase(moveNumber, heuristics)
  const phaseName = phase === 'opening' ? 'APERTURA' : phase === 'middlegame' ? 'MEDIO JUEGO' : 'FINAL'

  const movesStr = fullHistory ? formatMoveHistory(fullHistory) : ''

  // Heuristics block WITHOUT engine lines (empty array) — we don't want to leak PV data
  const dataBlock = buildHeuristicsBlock(heuristics, [], phase)

  return `FEN: ${fen}
Turno: ${turnName} (jugada ${moveNumber}) — Fase: ${phaseName}
${movesStr ? `Partida: ${movesStr}` : ''}

${dataBlock}

MEJOR JUGADA (secreto, NO revelar): ${bestMoveSan}

Generá una PISTA CONCEPTUAL sobre la idea específica detrás de ESA jugada. Analizá qué logra concretamente en la posición actual. PROHIBIDO nombrar la jugada, la pieza que se mueve, o la casilla. PROHIBIDO dar consejos genéricos que no se relacionen directamente con la jugada. Máximo 1-2 oraciones.`
}

/**
 * Build a prompt to explain why the best move was better than the played move.
 * Used after the user attempts a move in training mode.
 *
 * @param {Object} params
 * @param {string} params.fen - Position FEN before the move
 * @param {string} params.turn - 'w' or 'b'
 * @param {string} params.playedMove - SAN of the move the user played
 * @param {string} params.bestMove - SAN of the engine's best move
 * @param {string} params.classification - Move classification (excellent/good/inaccuracy/mistake/blunder)
 * @param {number} params.cpLoss - Centipawn loss
 * @param {Array}  params.fullHistory - Move history
 */
export function buildAttemptFeedbackPrompt({ fen, turn, playedMove, bestMove, classification, cpLoss, fullHistory }) {
  const turnName = turn === 'w' ? 'Blancas' : 'Negras'
  const moveNumber = fullHistory ? Math.floor(fullHistory.length / 2) + 1 : 1
  const movesStr = fullHistory ? formatMoveHistory(fullHistory) : ''

  if (classification === 'excellent' || classification === 'good') {
    return `Posición (FEN): ${fen}
Jugada ${moveNumber}. ${turnName} jugó ${playedMove}
Evaluación: ${classification}${cpLoss > 0 ? ` (pérdida mínima: ${cpLoss} cp)` : ''}
${movesStr ? `Partida: ${movesStr}` : ''}

Explicá brevemente qué logra esta jugada: qué mejora, qué amenaza, o qué controla.`
  }

  return `Posición antes de la jugada (FEN): ${fen}
Jugada ${moveNumber}. ${turnName} jugó ${playedMove}
Evaluación: ${classification} (pérdida: ${cpLoss} cp)
Mejor jugada del motor: ${bestMove}
${movesStr ? `Partida: ${movesStr}` : ''}

Explicá por qué ${bestMove} era mejor que ${playedMove}. ¿Qué pierde o qué deja de ganar el jugador con ${playedMove}?`
}

/**
 * Build a prompt for threat analysis explanation.
 * Uses pre-computed factual data from analyzeThreatMove() to anchor LLM analysis.
 *
 * @param {Object} params
 * @param {string} params.fen - Current position FEN
 * @param {string} params.turn - 'w' or 'b' (side to move in the ORIGINAL position)
 * @param {string} params.threatMoveSan - Opponent's best move (SAN) from null-move analysis
 * @param {string} params.opponentColor - "Blancas" or "Negras"
 * @param {Array}  params.fullHistory - Move history
 * @param {Object} params.heuristics - Position heuristics for context
 */
export function buildThreatPrompt({ fen, turn, threatMoveSan, opponentColor, fullHistory, heuristics }) {
  const moveNumber = fullHistory ? Math.floor(fullHistory.length / 2) + 1 : 1
  const phase = detectPhase(moveNumber, heuristics)
  const movesStr = fullHistory ? formatMoveHistory(fullHistory) : ''

  // Pre-compute factual data about the threat move
  const analysis = analyzeThreatMove(fen, threatMoveSan)
  const verifiedBlock = analysis?.dataBlock || ''

  // Heuristics block for positional context (no engine lines)
  const dataBlock = heuristics ? buildHeuristicsBlock(heuristics, [], phase) : ''

  return `FEN: ${fen}
Jugada ${moveNumber}. Turno: ${turn === 'w' ? 'Blancas' : 'Negras'}
${movesStr ? `Últimas jugadas: ${movesStr}` : ''}

${dataBlock ? `${dataBlock}\n` : ''}Si ${opponentColor} pudieran jugar ahora, su mejor jugada sería: ${threatMoveSan}

${verifiedBlock}

Explicá qué amenaza esa jugada usando SOLO los datos verificados de arriba. Describí el peligro concreto para el rival. PROHIBIDO sugerir jugadas defensivas o respuestas (ni nombrar jugadas, piezas ni casillas de respuesta).`
}
