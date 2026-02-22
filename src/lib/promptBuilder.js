import { formatScore } from './stockfishParser'

function formatPieces(counts) {
  const parts = []
  if (counts.q) parts.push(`${counts.q}D`)
  if (counts.r) parts.push(`${counts.r}T`)
  if (counts.b) parts.push(`${counts.b}A`)
  if (counts.n) parts.push(`${counts.n}C`)
  if (counts.p) parts.push(`${counts.p}P`)
  return parts.join(' ') || 'ninguna'
}

function formatPawnIssues(pawnData) {
  const issues = []
  if (pawnData.isolated.length) issues.push(`aislados: ${pawnData.isolated.join(', ')}`)
  if (pawnData.doubled.length) issues.push(`doblados col. ${pawnData.doubled.join(', ')}`)
  if (pawnData.passed.length) issues.push(`pasados: ${pawnData.passed.join(', ')}`)
  if (issues.length === 0) return 'sólida'
  return issues.join('; ')
}

/**
 * Detect game phase from move number + material on board.
 */
export function detectPhase(moveNumber, heuristics) {
  const mat = heuristics?.material
  if (!mat) {
    if (moveNumber <= 10) return 'opening'
    return 'middlegame'
  }

  const nonPawnWhite = mat.whiteValue - (mat.white.p || 0)
  const nonPawnBlack = mat.blackValue - (mat.black.p || 0)
  const totalNonPawn = nonPawnWhite + nonPawnBlack
  const queensGone = !(mat.white.q) && !(mat.black.q)
  const isEndgame = totalNonPawn <= 26 || (queensGone && totalNonPawn <= 30)

  if (isEndgame && moveNumber > 25) return 'endgame'
  if (moveNumber <= 10) return 'opening'
  if (moveNumber <= 15 && !isEndgame) {
    const dev = heuristics?.development
    if (dev) {
      const totalDev = dev.white.developed + dev.black.developed
      const totalPossible = dev.white.total + dev.black.total
      if (totalDev < totalPossible * 0.7) return 'opening'
    }
    return 'middlegame'
  }
  return isEndgame ? 'endgame' : 'middlegame'
}

/**
 * Format full move history as PGN string.
 */
function formatMoveHistory(fullHistory) {
  if (!fullHistory || fullHistory.length === 0) return ''
  const moves = []
  for (let i = 0; i < fullHistory.length; i++) {
    if (i % 2 === 0) moves.push(`${Math.floor(i / 2) + 1}. ${fullHistory[i].san}`)
    else moves.push(fullHistory[i].san)
  }
  return moves.join(' ')
}

/**
 * Format Stockfish lines as readable text for the LLM.
 * Input: array of parsed lines [{ score, pv, depth, multipv, wdl }]
 * The `pvSan` field should be added by the caller (pre-converted to SAN).
 */
function formatStockfishLines(lines) {
  if (!lines || lines.length === 0) return ''

  const parts = lines.map((line, i) => {
    const scoreStr = formatScore(line.score)
    const moves = line.pvSan ? line.pvSan.join(' ') : line.pv?.slice(0, 6).join(' ') || ''
    return `Línea ${i + 1} (${scoreStr}): ${moves}`
  })

  return `MOTOR (depth ${lines[0]?.depth || '?'}):\n${parts.join('\n')}`
}

/**
 * Build data block with ONLY the heuristics relevant to the current phase.
 */
function buildHeuristicsBlock(heuristics, lines, phase) {
  const sections = []

  // Stockfish lines — always relevant, most important data
  const sfBlock = formatStockfishLines(lines)
  if (sfBlock) sections.push(sfBlock)

  // Material — always relevant
  const mat = heuristics?.material
  if (mat) {
    let matStr = `MATERIAL: B ${formatPieces(mat.white)} (${mat.whiteValue}) — N ${formatPieces(mat.black)} (${mat.blackValue})`
    if (mat.balance !== 0) matStr += ` | ${mat.balance > 0 ? '+' : ''}${mat.balance}`
    if (mat.bishopPair.white) matStr += ' | B: par alfiles'
    if (mat.bishopPair.black) matStr += ' | N: par alfiles'
    sections.push(matStr)
  }

  // Opening: development + center are key
  if (phase === 'opening') {
    const dev = heuristics?.development
    if (dev) {
      sections.push(`DESARROLLO: B ${dev.white.developed}/${dev.white.total}${dev.white.castled ? ' ✓enroque' : ''} — N ${dev.black.developed}/${dev.black.total}${dev.black.castled ? ' ✓enroque' : ''}`)
    }
    const center = heuristics?.center
    if (center) {
      sections.push(`CENTRO: B ${center.white.toFixed(1)} — N ${center.black.toFixed(1)} (de 4)`)
    }
  }

  // Middlegame: pawns + king safety + activity
  if (phase === 'middlegame') {
    const pawns = heuristics?.pawns
    if (pawns) {
      sections.push(`PEONES: B: ${formatPawnIssues(pawns.white)} — N: ${formatPawnIssues(pawns.black)}`)
    }
    const ks = heuristics?.kingSafety
    if (ks) {
      sections.push(`REY: B ${ks.white?.castled ? 'enrocado' : 'SIN enrocar'}${ks.white?.openFiles?.length ? ', col.abiertas: ' + ks.white.openFiles.join(',') : ''} — N ${ks.black?.castled ? 'enrocado' : 'SIN enrocar'}${ks.black?.openFiles?.length ? ', col.abiertas: ' + ks.black.openFiles.join(',') : ''}`)
    }
    const act = heuristics?.activity
    if (act) {
      sections.push(`ACTIVIDAD: B ${act.white.mobility} jugadas${act.white.rookOpenFiles.length ? ', T col.' + act.white.rookOpenFiles.join(',') : ''} — N ${act.black.mobility}${act.black.rookOpenFiles.length ? ', T col.' + act.black.rookOpenFiles.join(',') : ''}`)
    }
  }

  // Endgame: pawns (passed pawns are critical) + activity
  if (phase === 'endgame') {
    const pawns = heuristics?.pawns
    if (pawns) {
      sections.push(`PEONES: B: ${formatPawnIssues(pawns.white)} — N: ${formatPawnIssues(pawns.black)}`)
    }
    const ks = heuristics?.kingSafety
    if (ks) {
      sections.push(`REY: B en ${ks.white?.kingSquare || '?'} — N en ${ks.black?.kingSquare || '?'}`)
    }
    const act = heuristics?.activity
    if (act && (act.white.rookOpenFiles.length || act.black.rookOpenFiles.length)) {
      sections.push(`TORRES: B col.${act.white.rookOpenFiles.join(',') || 'ninguna'} — N col.${act.black.rookOpenFiles.join(',') || 'ninguna'}`)
    }
  }

  return sections.join('\n')
}

/**
 * Build analysis prompt adapted to game phase.
 *
 * @param {Object} params
 * @param {string} params.fen
 * @param {string} params.turn - 'w' or 'b'
 * @param {Object} params.lastMove - { san }
 * @param {Array} params.lines - All Stockfish lines (with pvSan added)
 * @param {Object} params.heuristics
 * @param {Array} params.fullHistory - Array of { san } moves
 */
export function buildAnalysisPrompt({ fen, turn, lastMove, lines, heuristics, fullHistory }) {
  const turnName = turn === 'w' ? 'Blancas' : 'Negras'
  const moveNumber = fullHistory ? Math.floor(fullHistory.length / 2) + 1 : 1
  const phase = detectPhase(moveNumber, heuristics)

  const movesStr = fullHistory ? formatMoveHistory(fullHistory) : ''
  const dataBlock = buildHeuristicsBlock(heuristics, lines, phase)

  const header = `FEN: ${fen}
Turno: ${turnName} (jugada ${moveNumber}) — Fase: ${phase === 'opening' ? 'APERTURA' : phase === 'middlegame' ? 'MEDIO JUEGO' : 'FINAL'}
${lastMove ? `Última: ${lastMove.san}` : 'Posición inicial'}${movesStr ? `\nPartida: ${movesStr}` : ''}`

  let instruction = ''

  if (phase === 'opening') {
    if (moveNumber <= 3) {
      instruction = `Identificá la apertura (nombre exacto si es reconocible) y explicá qué busca cada bando con este planteo. Mencioná las ideas estratégicas y continuaciones típicas. No evalúes quién está mejor — es obvio que está igualado.`
    } else {
      instruction = `Identificá la apertura/variante y si hubo alguna desviación de la teoría. Explicá los planes típicos de esta estructura: dónde van las piezas, qué rupturas de peones buscar, qué lado del tablero es el campo de batalla principal.`
    }
  } else if (phase === 'middlegame') {
    instruction = `Analizá los desequilibrios clave de esta posición y el plan concreto que debería seguir cada bando. Enfocate en lo que hace interesante o crítica esta posición — no describas lo que ya se ve en los datos.`
  } else {
    instruction = `Clasificá este final y explicá los factores que deciden el resultado. ¿Es ganable, tablas técnicas, o depende de la precisión? ¿Cuál es el plan correcto? Enfocate en principios de finales, no en conceptos de apertura o medio juego.`
  }

  return `${header}

${dataBlock}

${instruction}`
}
