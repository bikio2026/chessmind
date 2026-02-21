import { Chess } from 'chess.js'

const PIECE_VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }
const CENTER_SQUARES = ['e4', 'd4', 'e5', 'd5']
const EXTENDED_CENTER = ['c3', 'd3', 'e3', 'f3', 'c4', 'f4', 'c5', 'f5', 'c6', 'd6', 'e6', 'f6']

const WHITE_STARTING = {
  n: ['b1', 'g1'],
  b: ['c1', 'f1'],
  r: ['a1', 'h1'],
  q: ['d1'],
}
const BLACK_STARTING = {
  n: ['b8', 'g8'],
  b: ['c8', 'f8'],
  r: ['a8', 'h8'],
  q: ['d8'],
}

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const RANKS_WHITE = ['1', '2', '3', '4', '5', '6', '7', '8']

/**
 * Get all pieces of a given color from the board
 */
function getPieces(game, color) {
  const pieces = []
  const board = game.board()
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const piece = board[r][f]
      if (piece && piece.color === color) {
        const square = FILES[f] + (8 - r)
        pieces.push({ ...piece, square })
      }
    }
  }
  return pieces
}

/**
 * Count pawns per file for a given color
 */
function pawnsByFile(game, color) {
  const fileCounts = {}
  FILES.forEach(f => fileCounts[f] = 0)
  const pieces = getPieces(game, color)
  pieces.filter(p => p.type === 'p').forEach(p => {
    fileCounts[p.square[0]]++
  })
  return fileCounts
}

// ─── MATERIAL ──────────────────────────────────────────

export function materialBalance(game) {
  const white = { p: 0, n: 0, b: 0, r: 0, q: 0 }
  const black = { p: 0, n: 0, b: 0, r: 0, q: 0 }

  const board = game.board()
  for (const row of board) {
    for (const piece of row) {
      if (!piece || piece.type === 'k') continue
      if (piece.color === 'w') white[piece.type]++
      else black[piece.type]++
    }
  }

  const whiteValue = Object.entries(white).reduce((sum, [t, c]) => sum + PIECE_VALUES[t] * c, 0)
  const blackValue = Object.entries(black).reduce((sum, [t, c]) => sum + PIECE_VALUES[t] * c, 0)

  return {
    white, black,
    whiteValue, blackValue,
    balance: whiteValue - blackValue,
    bishopPair: {
      white: white.b >= 2,
      black: black.b >= 2,
    },
  }
}

// ─── CENTER CONTROL ────────────────────────────────────

export function centerControl(game) {
  const result = { white: 0, black: 0, squares: {} }

  for (const sq of CENTER_SQUARES) {
    const piece = game.get(sq)
    // Pawn occupation is strongest control
    if (piece && piece.type === 'p') {
      if (piece.color === 'w') result.white += 1.5
      else result.black += 1.5
      result.squares[sq] = piece.color === 'w' ? 'white-pawn' : 'black-pawn'
      continue
    }
    // Piece occupation
    if (piece) {
      if (piece.color === 'w') result.white += 0.5
      else result.black += 0.5
    }

    // Check attacks on this square
    try {
      if (game.isAttacked(sq, 'w')) result.white += 0.5
      if (game.isAttacked(sq, 'b')) result.black += 0.5
    } catch {
      // isAttacked may not be available in all versions
    }
  }

  return result
}

// ─── DEVELOPMENT ───────────────────────────────────────

export function development(game) {
  const whitePieces = getPieces(game, 'w')
  const blackPieces = getPieces(game, 'b')

  let whiteDeveloped = 0
  let whiteTotal = 0
  for (const [type, startingSquares] of Object.entries(WHITE_STARTING)) {
    whiteTotal += startingSquares.length
    for (const sq of startingSquares) {
      const piece = game.get(sq)
      // If the piece has moved from its starting square (or been captured/exchanged)
      if (!piece || piece.type !== type || piece.color !== 'w') {
        whiteDeveloped++
      }
    }
  }

  let blackDeveloped = 0
  let blackTotal = 0
  for (const [type, startingSquares] of Object.entries(BLACK_STARTING)) {
    blackTotal += startingSquares.length
    for (const sq of startingSquares) {
      const piece = game.get(sq)
      if (!piece || piece.type !== type || piece.color !== 'b') {
        blackDeveloped++
      }
    }
  }

  // Check castling - has the king moved from e1/e8?
  const whiteKing = game.get('e1')
  const blackKing = game.get('e8')
  const whiteCastled = !whiteKing || whiteKing.type !== 'k'
  const blackCastled = !blackKing || blackKing.type !== 'k'

  return {
    white: { developed: whiteDeveloped, total: whiteTotal, castled: whiteCastled },
    black: { developed: blackDeveloped, total: blackTotal, castled: blackCastled },
  }
}

// ─── PAWN STRUCTURE ────────────────────────────────────

export function pawnStructure(game) {
  const result = {
    white: { isolated: [], doubled: [], passed: [], backward: [], islands: 0 },
    black: { isolated: [], doubled: [], passed: [], backward: [], islands: 0 },
  }

  for (const color of ['w', 'b']) {
    const side = color === 'w' ? 'white' : 'black'
    const enemy = color === 'w' ? 'b' : 'w'
    const ownPawns = pawnsByFile(game, color)
    const enemyPawns = pawnsByFile(game, enemy)
    const direction = color === 'w' ? 1 : -1

    const pieces = getPieces(game, color).filter(p => p.type === 'p')

    for (const pawn of pieces) {
      const file = pawn.square[0]
      const rank = parseInt(pawn.square[1])
      const fileIdx = FILES.indexOf(file)
      const adjFiles = [FILES[fileIdx - 1], FILES[fileIdx + 1]].filter(Boolean)

      // Isolated: no friendly pawns on adjacent files
      const hasAdjacentPawn = adjFiles.some(f => ownPawns[f] > 0)
      if (!hasAdjacentPawn) {
        result[side].isolated.push(pawn.square)
      }

      // Doubled: more than one pawn on same file
      if (ownPawns[file] > 1) {
        if (!result[side].doubled.includes(file)) {
          result[side].doubled.push(file)
        }
      }

      // Passed: no enemy pawns on same or adjacent files ahead
      let isPassed = true
      const checkFiles = [file, ...adjFiles]
      for (const f of checkFiles) {
        const ep = getPieces(game, enemy).filter(p => p.type === 'p' && p.square[0] === f)
        for (const ep2 of ep) {
          const eRank = parseInt(ep2.square[1])
          if (color === 'w' && eRank > rank) { isPassed = false; break }
          if (color === 'b' && eRank < rank) { isPassed = false; break }
        }
        if (!isPassed) break
      }
      if (isPassed) {
        result[side].passed.push(pawn.square)
      }
    }

    // Pawn islands: count groups of connected files with pawns
    let inIsland = false
    let islands = 0
    for (const file of FILES) {
      if (ownPawns[file] > 0) {
        if (!inIsland) { islands++; inIsland = true }
      } else {
        inIsland = false
      }
    }
    result[side].islands = islands
  }

  return result
}

// ─── KING SAFETY ───────────────────────────────────────

export function kingSafety(game) {
  const result = { white: null, black: null }

  for (const color of ['w', 'b']) {
    const side = color === 'w' ? 'white' : 'black'
    const pieces = getPieces(game, color)
    const king = pieces.find(p => p.type === 'k')
    if (!king) { result[side] = { safe: false, castled: false, shield: [], openFiles: [] }; continue }

    const kFile = FILES.indexOf(king.square[0])
    const kRank = parseInt(king.square[1])

    // Castled detection
    const castled = color === 'w'
      ? (kFile >= 5 || kFile <= 2) && kRank === 1
      : (kFile >= 5 || kFile <= 2) && kRank === 8

    // Pawn shield: pawns on files around the king, one rank ahead
    const shield = []
    const shieldRank = color === 'w' ? kRank + 1 : kRank - 1
    for (let f = Math.max(0, kFile - 1); f <= Math.min(7, kFile + 1); f++) {
      const sq = FILES[f] + shieldRank
      const piece = game.get(sq)
      if (piece && piece.type === 'p' && piece.color === color) {
        shield.push(sq)
      }
    }

    // Open files near king
    const openFiles = []
    const ownPawns = pawnsByFile(game, color)
    const enemyPawns = pawnsByFile(game, color === 'w' ? 'b' : 'w')
    for (let f = Math.max(0, kFile - 1); f <= Math.min(7, kFile + 1); f++) {
      const file = FILES[f]
      if (ownPawns[file] === 0 && enemyPawns[file] === 0) {
        openFiles.push(file)
      }
    }

    result[side] = { castled, shield, openFiles, kingSquare: king.square }
  }

  return result
}

// ─── PIECE ACTIVITY ────────────────────────────────────

export function pieceActivity(game) {
  const result = {
    white: { mobility: 0, rookOpenFiles: [], outposts: [] },
    black: { mobility: 0, rookOpenFiles: [], outposts: [] },
  }

  // We need to calculate mobility for the side to move
  // For the other side, we estimate based on piece positions
  const currentTurn = game.turn()

  // Calculate mobility for side to move
  const allMoves = game.moves({ verbose: true })
  const mobilityCount = allMoves.length

  if (currentTurn === 'w') {
    result.white.mobility = mobilityCount
    // Estimate black mobility: roughly similar unless constrained
    result.black.mobility = Math.round(mobilityCount * 0.9)
  } else {
    result.black.mobility = mobilityCount
    result.white.mobility = Math.round(mobilityCount * 0.9)
  }

  // Rooks on open/semi-open files
  for (const color of ['w', 'b']) {
    const side = color === 'w' ? 'white' : 'black'
    const ownPawns = pawnsByFile(game, color)
    const rooks = getPieces(game, color).filter(p => p.type === 'r')

    for (const rook of rooks) {
      const file = rook.square[0]
      if (ownPawns[file] === 0) {
        result[side].rookOpenFiles.push(file)
      }
    }
  }

  return result
}

// ─── SPACE ─────────────────────────────────────────────

export function spaceAdvantage(game) {
  let white = 0
  let black = 0

  // Count pieces/pawns in advanced territory (central files c-f)
  const board = game.board()
  for (let r = 0; r < 8; r++) {
    for (let f = 2; f <= 5; f++) { // files c through f
      const piece = board[r][f]
      if (!piece) continue
      const rank = 8 - r
      if (piece.color === 'w' && rank >= 4) white++
      if (piece.color === 'b' && rank <= 5) black++
    }
  }

  return { white, black }
}

// ─── AGGREGATE ─────────────────────────────────────────

export function analyzePosition(game) {
  return {
    material: materialBalance(game),
    center: centerControl(game),
    development: development(game),
    pawns: pawnStructure(game),
    kingSafety: kingSafety(game),
    activity: pieceActivity(game),
    space: spaceAdvantage(game),
  }
}
