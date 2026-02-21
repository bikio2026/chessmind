import { formatScore, evalToPercentage } from '../lib/stockfishParser'

export function EvalBar({ score, isGameOver, turn }) {
  let effectiveScore = score
  let displayScoreText = formatScore(score)

  if (isGameOver) {
    if (!score) {
      // No Stockfish score = checkmate (bestmove none, no info lines)
      // turn = side that must move = the loser
      effectiveScore = turn === 'w'
        ? { type: 'mate', value: -1 } // Black won
        : { type: 'mate', value: 1 }   // White won
      displayScoreText = turn === 'w' ? '0-1' : '1-0'
    } else {
      // Draw/stalemate — Stockfish had a score before game ended
      effectiveScore = { type: 'cp', value: 0 }
      displayScoreText = '½-½'
    }
  }

  const whitePercent = evalToPercentage(effectiveScore)
  const isWhiteAdvantage = !effectiveScore || effectiveScore.value >= 0

  return (
    <div
      className="relative w-7 rounded-sm overflow-hidden flex-shrink-0 self-stretch"
      style={{ minHeight: 200 }}
    >
      {/* Black side (top) */}
      <div
        className="absolute top-0 left-0 right-0 bg-eval-black transition-all duration-500 ease-out"
        style={{ height: `${100 - whitePercent}%` }}
      />
      {/* White side (bottom) */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-eval-white transition-all duration-500 ease-out"
        style={{ height: `${whitePercent}%` }}
      />
      {/* Score label */}
      <div
        className={`absolute left-0 right-0 flex items-center justify-center text-[10px] font-bold font-mono transition-all duration-500 ${
          isWhiteAdvantage ? 'text-eval-black' : 'text-eval-white'
        }`}
        style={{
          top: isWhiteAdvantage ? `${100 - whitePercent}%` : undefined,
          bottom: !isWhiteAdvantage ? `${whitePercent}%` : undefined,
          transform: 'translateY(-50%)',
        }}
      >
        {displayScoreText}
      </div>
    </div>
  )
}
