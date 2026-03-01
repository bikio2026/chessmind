import { useEffect, useRef } from 'react'
import { CLASSIFICATIONS } from '../../hooks/useTrainerEngine'

/**
 * Move list with inline classification annotations for Guided Training.
 * Adapts the TrainerMoveList pattern for the Analyzer context.
 *
 * Player moves show: colored text + classification symbol (✓✓, ?, etc.)
 * Opponent moves: neutral color
 * Current position: highlighted row
 * Future moves: hidden
 */
export function GuidedMoveList({
  history,
  attempts,
  currentMoveIndex,
  playerSide,
  onMoveClick,
}) {
  const scrollRef = useRef(null)
  const activeRef = useRef(null)

  // Auto-scroll to active move
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      activeRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [currentMoveIndex])

  if (history.length === 0) {
    return (
      <div className="bg-surface-alt rounded-xl p-4 border border-surface-light/30">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Jugadas</h3>
        <p className="text-xs text-text-muted text-center py-4">
          Cargá una partida desde la Biblioteca para empezar
        </p>
      </div>
    )
  }

  // Only show moves up to current position + 1 (the one they need to find)
  const visibleUpTo = currentMoveIndex + 1

  // Group moves in pairs
  const rows = []
  for (let i = 0; i < history.length && i <= visibleUpTo; i += 2) {
    const whiteMove = history[i]
    const blackMove = i + 1 < history.length && i + 1 <= visibleUpTo ? history[i + 1] : null
    const moveNum = Math.floor(i / 2) + 1
    rows.push({
      moveNum,
      white: { move: whiteMove, index: i },
      black: blackMove ? { move: blackMove, index: i + 1 } : null,
    })
  }

  const hasHidden = visibleUpTo < history.length - 1

  return (
    <div className="bg-surface-alt rounded-xl border border-surface-light/30">
      <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider px-3 pt-3 pb-1">
        Jugadas
      </h3>
      <div ref={scrollRef} className="max-h-52 overflow-y-auto px-2 pb-2">
        {rows.map(row => {
          const isActiveRow =
            row.white.index === currentMoveIndex ||
            (row.black && row.black.index === currentMoveIndex)

          return (
            <div
              key={row.moveNum}
              ref={isActiveRow ? activeRef : undefined}
              className={`flex items-center gap-0.5 text-sm py-0.5 rounded transition-colors ${
                isActiveRow ? 'bg-accent/10' : ''
              }`}
            >
              <span className="w-7 text-right text-text-muted text-xs font-mono shrink-0">
                {row.moveNum}.
              </span>
              <MoveCell
                san={row.white.move.san}
                attempt={attempts.get(row.white.index)}
                isPlayerMove={playerSide === 'both' || playerSide === 'w'}
                isActive={row.white.index === currentMoveIndex}
                isFuture={row.white.index > currentMoveIndex}
                onClick={() => row.white.index <= currentMoveIndex && onMoveClick?.(row.white.index)}
              />
              {row.black ? (
                <MoveCell
                  san={row.black.move.san}
                  attempt={attempts.get(row.black.index)}
                  isPlayerMove={playerSide === 'both' || playerSide === 'b'}
                  isActive={row.black.index === currentMoveIndex}
                  isFuture={row.black.index > currentMoveIndex}
                  onClick={() => row.black.index <= currentMoveIndex && onMoveClick?.(row.black.index)}
                />
              ) : (
                <span className="flex-1" />
              )}
            </div>
          )
        })}

        {hasHidden && (
          <div className="text-[10px] text-text-muted/50 text-center py-1 italic">
            ... jugadas ocultas
          </div>
        )}
      </div>
    </div>
  )
}

function MoveCell({ san, attempt, isPlayerMove, isActive, isFuture, onClick }) {
  const cls = attempt?.classification
  const info = cls ? CLASSIFICATIONS[cls] : null

  // Only annotate player moves that have been attempted
  const showAnnotation = isPlayerMove && info && attempt
  const style = showAnnotation ? { color: info.color } : {}

  const isClickable = !isFuture && onClick

  return (
    <span
      className={`flex-1 px-1.5 py-0.5 rounded text-sm font-mono cursor-default transition-colors ${
        isFuture
          ? 'text-text-muted/30'
          : isActive
            ? 'font-bold text-accent'
            : showAnnotation
              ? 'font-medium'
              : 'text-text-dim'
      } ${isClickable ? 'hover:bg-surface-light/50 cursor-pointer' : ''}`}
      style={style}
      title={showAnnotation ? `${info.label} (${attempt.scoreDiff || 0} cp)` : ''}
      onClick={isClickable ? onClick : undefined}
    >
      {showAnnotation && (
        <span className="text-[10px] mr-0.5">{info.symbol}</span>
      )}
      {san}
      {attempt?.isCorrect && <span className="ml-0.5 text-[10px]">✓</span>}
    </span>
  )
}
