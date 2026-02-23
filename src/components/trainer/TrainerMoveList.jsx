import { useEffect, useRef } from 'react'
import { CLASSIFICATIONS } from '../../hooks/useTrainerEngine'

/**
 * Move list with color-coded classifications for the trainer.
 */
export function TrainerMoveList({ history, moveEvaluations, playerColor }) {
  const scrollRef = useRef(null)

  // Auto-scroll to bottom on new moves
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history.length])

  if (history.length === 0) {
    return (
      <div className="bg-surface-alt rounded-xl p-4 border border-surface-light/30">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Jugadas</h3>
        <p className="text-xs text-text-muted text-center py-4">
          {playerColor === 'white' ? 'Hacé tu primera jugada' : 'Esperando respuesta del motor...'}
        </p>
      </div>
    )
  }

  // Group moves in pairs (white + black)
  const rows = []
  for (let i = 0; i < history.length; i += 2) {
    const whiteMove = history[i]
    const blackMove = i + 1 < history.length ? history[i + 1] : null
    const moveNum = Math.floor(i / 2) + 1
    rows.push({ moveNum, white: { move: whiteMove, index: i }, black: blackMove ? { move: blackMove, index: i + 1 } : null })
  }

  return (
    <div className="bg-surface-alt rounded-xl border border-surface-light/30">
      <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider px-3 pt-3 pb-1">Jugadas</h3>
      <div ref={scrollRef} className="max-h-48 overflow-y-auto px-2 pb-2">
        {rows.map(row => (
          <div key={row.moveNum} className="flex items-center gap-0.5 text-sm py-0.5">
            <span className="w-7 text-right text-text-muted text-xs font-mono shrink-0">{row.moveNum}.</span>
            <MoveCell
              san={row.white.move.san}
              evaluation={moveEvaluations.get(row.white.index)}
              isPlayerMove={playerColor === 'white'}
            />
            {row.black && (
              <MoveCell
                san={row.black.move.san}
                evaluation={moveEvaluations.get(row.black.index)}
                isPlayerMove={playerColor === 'black'}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function MoveCell({ san, evaluation, isPlayerMove }) {
  const cls = evaluation?.classification
  const info = cls ? CLASSIFICATIONS[cls] : null

  // Only color player's moves
  const style = isPlayerMove && info ? { color: info.color } : {}
  const symbol = isPlayerMove && info ? info.symbol : ''

  return (
    <span
      className={`flex-1 px-1.5 py-0.5 rounded text-sm font-mono ${
        isPlayerMove && info ? 'font-medium' : 'text-text-dim'
      }`}
      style={style}
      title={isPlayerMove && info ? `${info.label} (${evaluation?.scoreDiff || 0} cp)` : ''}
    >
      {symbol && <span className="text-[10px] mr-0.5">{symbol}</span>}
      {san}
    </span>
  )
}
