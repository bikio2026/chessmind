/**
 * Prompt builder for the Opening Trainer's per-move LLM feedback.
 * Unlike the analyzer's promptBuilder (full position analysis),
 * this focuses on explaining a SINGLE move in the context of the opening.
 */

/**
 * Format move history as PGN string.
 */
function formatHistory(history) {
  if (!history || history.length === 0) return '(posición inicial)'
  let pgn = ''
  for (let i = 0; i < history.length; i++) {
    if (i % 2 === 0) pgn += `${Math.floor(i / 2) + 1}. `
    pgn += history[i].san + ' '
  }
  return pgn.trim()
}

/**
 * Format the main line for display.
 */
function formatMainLine(mainLine) {
  let pgn = ''
  for (let i = 0; i < mainLine.length; i++) {
    if (i % 2 === 0) pgn += `${Math.floor(i / 2) + 1}. `
    pgn += mainLine[i] + ' '
  }
  return pgn.trim()
}

/**
 * Build a trainer prompt for LLM feedback on a specific move.
 *
 * @param {Object} params
 * @param {Object} params.opening       - Opening with name, eco, mainLine, keyIdeas, description
 * @param {number} params.moveNumber    - Human move number (1-based)
 * @param {string} params.side          - 'Blancas' or 'Negras'
 * @param {string} params.playedMove    - SAN of the move played
 * @param {string} params.bestMove      - SAN of engine's best move
 * @param {string} params.classification - 'book'|'excellent'|'good'|'inaccuracy'|'mistake'|'blunder'
 * @param {number} params.cpLoss        - Centipawn loss
 * @param {string} params.fen           - FEN before the move was played
 * @param {Array}  params.history       - Full history array (verbose objects with .san)
 * @param {boolean} params.isDeviation  - Whether this was a theory deviation
 * @param {string} params.expectedTheoryMove - Expected theory move (if deviation)
 */
export function buildTrainerPrompt({
  opening,
  moveNumber,
  side,
  playedMove,
  bestMove,
  classification,
  cpLoss,
  fen,
  history,
  isDeviation,
  expectedTheoryMove,
}) {
  const historyStr = formatHistory(history)
  const mainLineStr = formatMainLine(opening.mainLine)

  // ── Book move: explain the theory concept ──
  if (classification === 'book') {
    return `Apertura: ${opening.name} (${opening.eco})
Posición (FEN): ${fen}
Jugada ${moveNumber}. ${playedMove} — Jugada de libro.
Línea principal: ${mainLineStr}
Partida: ${historyStr}

Explicá la idea estratégica detrás de ${playedMove} en esta apertura. ¿Qué busca? ¿Qué prepara para las siguientes jugadas?`
  }

  // ── Theory deviation ──
  if (isDeviation) {
    return `Apertura: ${opening.name} (${opening.eco})
Posición antes del desvío (FEN): ${fen}
Jugada ${moveNumber}. ${side} jugó ${playedMove} — DESVÍO de la teoría
La línea principal esperaba: ${expectedTheoryMove}
Evaluación: ${classification} (pérdida: ${cpLoss} cp)
Mejor jugada del motor: ${bestMove}
Línea principal completa: ${mainLineStr}
Partida: ${historyStr}

El jugador se desvió de la línea principal. Explicá qué plan o idea se pierde al no jugar ${expectedTheoryMove}, y qué consecuencia concreta tiene ${playedMove}.`
  }

  // ── Good/excellent move: positive reinforcement ──
  if (classification === 'excellent' || classification === 'good') {
    return `Apertura practicada: ${opening.name} (${opening.eco})
Posición (FEN): ${fen}
Jugada ${moveNumber}. ${side} jugó ${playedMove}
Evaluación: ${classification}${cpLoss > 0 ? ` (pérdida mínima: ${cpLoss} cp)` : ''}
Partida: ${historyStr}

Explicá brevemente qué logra esta jugada: qué mejora, qué amenaza, o qué controla.`
  }

  // ── Inaccuracy / mistake / blunder ──
  return `Apertura practicada: ${opening.name} (${opening.eco})
Posición antes de la jugada (FEN): ${fen}
Jugada ${moveNumber}. ${side} jugó ${playedMove}
Evaluación: ${classification} (pérdida: ${cpLoss} cp)
Mejor jugada del motor: ${bestMove}
Partida: ${historyStr}

Explicá por qué ${bestMove} era mejor que ${playedMove}. ¿Qué pierde o qué deja de ganar el jugador con ${playedMove}?`
}
