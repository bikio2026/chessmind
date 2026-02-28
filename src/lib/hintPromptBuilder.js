/**
 * Prompt builder for Training Mode hints.
 * Generates conceptual hints that describe the strategic idea
 * behind the best move WITHOUT revealing the move itself.
 */

import { detectPhase, buildHeuristicsBlock, formatMoveHistory } from './promptBuilder'

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
 * Used when the user activates "Mostrar amenazas" (null-move analysis).
 *
 * @param {Object} params
 * @param {string} params.fen - Current position FEN
 * @param {string} params.turn - 'w' or 'b' (side to move in the ORIGINAL position)
 * @param {string} params.threatMoveSan - Opponent's best move (SAN) from null-move analysis
 * @param {string} params.opponentColor - "Blancas" or "Negras"
 * @param {Array}  params.fullHistory - Move history
 */
export function buildThreatPrompt({ fen, turn, threatMoveSan, opponentColor, fullHistory }) {
  const moveNumber = fullHistory ? Math.floor(fullHistory.length / 2) + 1 : 1
  const movesStr = fullHistory ? formatMoveHistory(fullHistory) : ''

  return `FEN: ${fen}
Jugada ${moveNumber}. Turno: ${turn === 'w' ? 'Blancas' : 'Negras'}
${movesStr ? `Partida: ${movesStr}` : ''}

Si ${opponentColor} pudieran jugar ahora, su mejor jugada sería: ${threatMoveSan}

Explicá qué amenaza concretamente esa jugada, qué daño causaría, y cómo debería reaccionar el jugador.`
}
