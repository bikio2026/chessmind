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
  if (pawnData.doubled.length) issues.push(`doblados en columna ${pawnData.doubled.join(', ')}`)
  if (pawnData.passed.length) issues.push(`pasados: ${pawnData.passed.join(', ')}`)
  if (issues.length === 0) return 'estructura sólida'
  return issues.join('; ')
}

/**
 * Detect the game phase based on move number and material.
 * Returns 'opening', 'middlegame', or 'endgame'.
 */
export function detectPhase(moveNumber, heuristics) {
  const mat = heuristics?.material
  if (!mat) {
    // Fallback to move number only
    if (moveNumber <= 10) return 'opening'
    return 'middlegame'
  }

  const totalPieces = (mat.whiteValue + mat.blackValue) -
    // Subtract kings (not counted in value usually, but let's be safe)
    // Piece values: Q=9, R=5, B=3, N=3, P=1
    (mat.white.p || 0) - (mat.black.p || 0) // non-pawn material

  const nonPawnWhite = mat.whiteValue - (mat.white.p || 0)
  const nonPawnBlack = mat.blackValue - (mat.black.p || 0)
  const totalNonPawn = nonPawnWhite + nonPawnBlack

  // Endgame: both sides have ≤13 non-pawn material (roughly no queens or only minor pieces)
  const queensGone = !(mat.white.q) && !(mat.black.q)
  const isEndgame = totalNonPawn <= 26 || (queensGone && totalNonPawn <= 30)

  if (isEndgame && moveNumber > 25) return 'endgame'
  if (moveNumber <= 10) return 'opening'
  if (moveNumber <= 15 && !isEndgame) {
    // Transition zone: check development
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
 * Format the full move history as a PGN-like string for opening identification.
 */
function formatMoveHistory(fullHistory) {
  if (!fullHistory || fullHistory.length === 0) return ''
  const moves = []
  for (let i = 0; i < fullHistory.length; i++) {
    const num = Math.floor(i / 2) + 1
    if (i % 2 === 0) {
      moves.push(`${num}. ${fullHistory[i].san}`)
    } else {
      moves.push(fullHistory[i].san)
    }
  }
  return moves.join(' ')
}

/**
 * Build the heuristics data block (shared across all phases).
 */
function buildHeuristicsBlock(heuristics, evaluation, phase) {
  const evalStr = evaluation?.score ? formatScore(evaluation.score) : 'no disponible'

  let wdlStr = ''
  if (evaluation?.wdl) {
    const w = (evaluation.wdl.win / 10).toFixed(1)
    const d = (evaluation.wdl.draw / 10).toFixed(1)
    const l = (evaluation.wdl.loss / 10).toFixed(1)
    wdlStr = ` | Win/Draw/Loss: ${w}% / ${d}% / ${l}%`
  }

  const sections = [`MOTOR: ${evalStr}${wdlStr}`]

  const mat = heuristics?.material
  if (mat) {
    sections.push(`MATERIAL: Blancas ${formatPieces(mat.white)} (${mat.whiteValue}) — Negras ${formatPieces(mat.black)} (${mat.blackValue}) | Balance: ${mat.balance > 0 ? '+' : ''}${mat.balance}${mat.bishopPair.white ? ' | Blancas: par de alfiles' : ''}${mat.bishopPair.black ? ' | Negras: par de alfiles' : ''}`)
  }

  // In opening, center and development are the most relevant
  const center = heuristics?.center
  if (center) {
    sections.push(`CENTRO: Blancas ${center.white.toFixed(1)} — Negras ${center.black.toFixed(1)} (de 4)`)
  }

  const dev = heuristics?.development
  if (dev) {
    sections.push(`DESARROLLO: Blancas ${dev.white.developed}/${dev.white.total}${dev.white.castled ? ' ✓enroque' : ''} — Negras ${dev.black.developed}/${dev.black.total}${dev.black.castled ? ' ✓enroque' : ''}`)
  }

  const pawns = heuristics?.pawns
  if (pawns) {
    sections.push(`PEONES: Blancas: ${formatPawnIssues(pawns.white)} — Negras: ${formatPawnIssues(pawns.black)}`)
  }

  // King safety more relevant in middlegame
  if (phase !== 'opening') {
    const ks = heuristics?.kingSafety
    if (ks) {
      sections.push(`REY: Blancas ${ks.white?.castled ? 'enrocadas' : 'SIN enrocar'}, escudo ${ks.white?.shield?.length || 0}p${ks.white?.openFiles?.length ? ', col. abiertas: ' + ks.white.openFiles.join(',') : ''} — Negras ${ks.black?.castled ? 'enrocadas' : 'SIN enrocar'}, escudo ${ks.black?.shield?.length || 0}p${ks.black?.openFiles?.length ? ', col. abiertas: ' + ks.black.openFiles.join(',') : ''}`)
    }
  }

  const act = heuristics?.activity
  if (act) {
    sections.push(`ACTIVIDAD: Blancas ${act.white.mobility} jugadas legales${act.white.rookOpenFiles.length ? ', T en col. ' + act.white.rookOpenFiles.join(',') : ''} — Negras ${act.black.mobility}${act.black.rookOpenFiles.length ? ', T en col. ' + act.black.rookOpenFiles.join(',') : ''}`)
  }

  if (phase !== 'opening') {
    const space = heuristics?.space
    if (space) {
      sections.push(`ESPACIO: Blancas ${space.white} piezas avanzadas — Negras ${space.black}`)
    }
  }

  return sections.join('\n')
}

/**
 * Build the analysis prompt, adapted to the game phase.
 *
 * Opening: focus on opening identification, plans, piece placement
 * Middlegame: strategic themes, imbalances, plans
 * Endgame: technique, key factors, conversion
 */
export function buildAnalysisPrompt({ fen, turn, lastMove, evaluation, heuristics, moveContext, fullHistory }) {
  const turnName = turn === 'w' ? 'Blancas' : 'Negras'
  const moveNumber = fullHistory ? Math.floor(fullHistory.length / 2) + 1 : (moveContext?.length ? Math.floor(moveContext[moveContext.length - 1].index / 2) + 1 : 1)
  const phase = detectPhase(moveNumber, heuristics)

  const dataBlock = buildHeuristicsBlock(heuristics, evaluation, phase)

  // Full move history for opening identification
  const movesStr = fullHistory ? formatMoveHistory(fullHistory) : ''

  // Base position info
  const header = `Posición: ${fen}
Turno: ${turnName} | Jugada nº ${moveNumber} | Fase: ${phase === 'opening' ? 'APERTURA' : phase === 'middlegame' ? 'MEDIO JUEGO' : 'FINAL'}
${lastMove ? `Última jugada: ${lastMove.san}` : 'Posición inicial'}
${movesStr ? `Partida: ${movesStr}` : ''}`

  // Phase-specific instructions
  let instructions = ''

  if (phase === 'opening') {
    if (moveNumber <= 3) {
      // Very early opening: identify and teach
      instructions = `Esta partida está en sus primeras jugadas. Tu análisis debe cubrir:

1. **Identificación de apertura**: ¿Qué apertura o sistema se está planteando? Mencioná el nombre exacto si es reconocible (ej: "Defensa Siciliana, variante Najdorf") o describí el esquema.
2. **Ideas de la apertura**: ¿Cuál es la lógica estratégica detrás de estas jugadas? ¿Qué busca cada bando? ¿Qué estructuras de peones típicas surgen?
3. **Continuaciones principales**: ¿Cuáles son las respuestas más comunes y por qué? ¿Qué variantes existen?

NO digas "la posición está igualada" como si fuera una revelación — eso es obvio en las primeras jugadas. Enfocate en ENSEÑAR sobre la apertura.`
    } else {
      // Moves 4-10: opening strategy
      instructions = `Estamos en la fase de apertura. Tu análisis debe cubrir:

1. **Apertura**: Identificá la apertura/variante exacta. Mencioná si algún bando se desvió de la teoría y qué implicaciones tiene.
2. **Temas de la apertura**: ¿Qué objetivos estratégicos plantea esta estructura? Casillas clave, planes típicos de peones, dónde van las piezas idealmente.
3. **Desarrollo y centro**: ¿Quién está desarrollándose mejor? ¿El centro está cerrado, abierto o en tensión? ¿Cómo afecta eso los planes?
4. **Transición al medio juego**: ¿Qué debe buscar cada bando para completar el desarrollo y empezar a jugar?

Evitá juicios prematuros de "quién está mejor" — a esta altura lo importante es la calidad del planteo, no una ventaja numérica.`
    }
  } else if (phase === 'middlegame') {
    instructions = `Estamos en el medio juego. Tu análisis estratégico debe cubrir:

1. **Evaluación posicional**: ¿Quién tiene ventaja y por qué? Referite a factores concretos: estructura de peones, actividad de piezas, seguridad del rey, control de casillas clave.
2. **Desequilibrios**: ¿Qué compensa cada bando? (ej: espacio vs par de alfiles, iniciativa vs material, peón pasado vs estructura). Estos desequilibrios son lo que hace interesante la posición.
3. **Planes**: ¿Cuál debería ser el plan de cada bando? Pensá en términos de maniobras de piezas, avances de peones, puntos de ruptura. Sé específico.
4. **Puntos críticos**: ¿Hay debilidades explotables? ¿Casillas estratégicas clave? ¿La posición se está simplificando o complicando?

Pensá como un GM comentando — no repitas números, construí una narrativa estratégica.`
  } else {
    // Endgame
    instructions = `Estamos en un final. Tu análisis técnico debe cubrir:

1. **Tipo de final**: Clasificá el final (ej: torre y peones, alfiles de distinto color, dama vs torre). Cada tipo tiene sus principios.
2. **Factores decisivos**: ¿Qué determina quién gana o empata? Rey activo, peones pasados, columnas abiertas para las torres, casillas clave, oposición, zugzwang, etc.
3. **Plan de conversión / defensa**: ¿Cómo debería jugar el bando con ventaja para ganar? ¿Cómo debería defenderse el otro?
4. **Evaluación**: ¿Es ganable, tablas teóricas, o depende de la técnica? Sé preciso.

En finales, la actividad del rey y la técnica son fundamentales. Enfocate en principios de final, no en aperturas.`
  }

  return `${header}

${dataBlock}

---
${instructions}

Respondé en 2-3 párrafos fluidos, como un GM comentarista. Sé conciso pero perspicaz.`
}
