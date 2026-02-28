import { useEffect, useRef } from 'react'
import { EyeOff } from 'lucide-react'

export function MoveList({ history, currentMoveIndex, onMoveClick, hideFutureMoves = false }) {
  const currentRef = useRef(null)

  // Auto-scroll to current move
  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [currentMoveIndex])

  // When hiding future moves, only show up to currentMoveIndex
  const visibleHistory = hideFutureMoves
    ? history.slice(0, currentMoveIndex + 1)
    : history

  // Build move pairs
  const movePairs = []
  for (let i = 0; i < visibleHistory.length; i += 2) {
    movePairs.push({
      number: Math.floor(i / 2) + 1,
      white: { san: visibleHistory[i].san, index: i },
      black: visibleHistory[i + 1] ? { san: visibleHistory[i + 1].san, index: i + 1 } : null,
    })
  }

  if (movePairs.length === 0) {
    return (
      <div className="bg-surface-alt rounded-lg p-3">
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Jugadas</h2>
        <p className="text-text-muted text-sm italic">Mové una pieza o cargá un PGN para empezar</p>
      </div>
    )
  }

  const hasHiddenMoves = hideFutureMoves && currentMoveIndex < history.length - 1

  return (
    <div className="bg-surface-alt rounded-lg p-3 max-h-64 overflow-y-auto">
      <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Jugadas</h2>
      <div className="font-mono text-sm space-y-0.5">
        {movePairs.map(pair => (
          <div key={pair.number} className="flex gap-1">
            <span className="w-8 text-text-muted text-right shrink-0">{pair.number}.</span>
            <button
              ref={currentMoveIndex === pair.white.index ? currentRef : null}
              onClick={() => onMoveClick(pair.white.index)}
              className={`px-1.5 py-0.5 rounded cursor-pointer hover:bg-surface-light transition-colors min-w-[3rem] text-left ${
                currentMoveIndex === pair.white.index ? 'bg-accent/20 text-accent font-semibold' : 'text-text'
              }`}
            >
              {pair.white.san}
            </button>
            {pair.black && (
              <button
                ref={currentMoveIndex === pair.black.index ? currentRef : null}
                onClick={() => onMoveClick(pair.black.index)}
                className={`px-1.5 py-0.5 rounded cursor-pointer hover:bg-surface-light transition-colors min-w-[3rem] text-left ${
                  currentMoveIndex === pair.black.index ? 'bg-accent/20 text-accent font-semibold' : 'text-text'
                }`}
              >
                {pair.black.san}
              </button>
            )}
          </div>
        ))}
      </div>
      {hasHiddenMoves && (
        <div className="text-[10px] text-text-muted italic mt-2 flex items-center gap-1">
          <EyeOff size={10} />
          Jugadas ocultas (modo entrenamiento)
        </div>
      )}
    </div>
  )
}
