import { CLASSIFICATIONS } from '../../hooks/useTrainerEngine'
import { Trophy, RotateCcw, X } from 'lucide-react'

/**
 * Session summary for Guided Training.
 * Shows accuracy, classification breakdown, key moments, and feedback ratings.
 */
export function GuidedSummary({ sessionStats, attempts, onReset, onExit }) {
  const { accuracy, total, correct, classifications, avgCpLoss } = sessionStats

  // Key moments: moves with cp loss > 50
  const keyMoments = []
  for (const [, record] of attempts) {
    if (record.scoreDiff > 50) {
      keyMoments.push(record)
    }
  }
  keyMoments.sort((a, b) => b.scoreDiff - a.scoreDiff)

  // Feedback ratings
  let thumbsUp = 0, thumbsDown = 0
  for (const [, record] of attempts) {
    if (record.feedbackRating === 'up') thumbsUp++
    if (record.feedbackRating === 'down') thumbsDown++
  }

  // Accuracy color
  const accuracyColor = accuracy >= 80
    ? 'text-move-excellent'
    : accuracy >= 60
      ? 'text-move-good-light'
      : accuracy >= 40
        ? 'text-move-inaccuracy'
        : 'text-move-blunder'

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Header */}
      <div className="bg-accent/10 rounded-xl border border-accent/20 p-4 text-center">
        <Trophy size={28} className="mx-auto mb-2 text-accent" />
        <h3 className="text-sm font-bold text-accent mb-1">Sesión completada</h3>
        <p className="text-xs text-text-dim">{total} jugadas analizadas</p>
      </div>

      {/* Accuracy */}
      <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-4 text-center">
        <div className={`text-4xl font-bold ${accuracyColor}`}>
          {accuracy}%
        </div>
        <div className="text-xs text-text-muted mt-1">
          Precisión ({correct} correctas de {total})
        </div>
        <div className="text-[10px] text-text-muted/60 mt-0.5">
          ACPL promedio: {avgCpLoss} cp
        </div>
      </div>

      {/* Classification breakdown */}
      <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-3">
        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
          Clasificación
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {Object.entries(CLASSIFICATIONS)
            .filter(([key]) => key !== 'book')
            .map(([key, info]) => {
              const count = classifications[key] || 0
              return (
                <div
                  key={key}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs ${
                    count > 0 ? 'bg-surface-light/50' : 'opacity-40'
                  }`}
                >
                  <span className="text-sm">{info.symbol}</span>
                  <span className="text-text-dim">{info.label}</span>
                  <span className="ml-auto font-mono font-medium" style={{ color: count > 0 ? info.color : undefined }}>
                    {count}
                  </span>
                </div>
              )
            })}
        </div>
      </div>

      {/* Key moments */}
      {keyMoments.length > 0 && (
        <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-3">
          <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
            Momentos clave
          </h4>
          <div className="space-y-1">
            {keyMoments.slice(0, 5).map((record, i) => {
              const info = CLASSIFICATIONS[record.classification]
              return (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="text-sm">{info?.symbol}</span>
                  <span className="font-mono text-text">{record.san}</span>
                  <span className="text-text-muted">
                    → mejor era <span className="font-mono" style={{ color: 'var(--color-move-excellent)' }}>{record.bestMoveSan}</span>
                  </span>
                  <span className="ml-auto text-text-muted font-mono">-{record.scoreDiff} cp</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Feedback quality */}
      {(thumbsUp > 0 || thumbsDown > 0) && (
        <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-3">
          <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
            Calidad del feedback
          </h4>
          <div className="flex items-center gap-4 text-xs text-text-dim">
            <span>👍 {thumbsUp}</span>
            <span>👎 {thumbsDown}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-accent/20 text-accent rounded-lg text-xs font-medium hover:bg-accent/30 transition-colors"
        >
          <RotateCcw size={13} />
          Reintentar
        </button>
        <button
          onClick={onExit}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-surface-alt text-text-dim rounded-lg text-xs font-medium hover:bg-surface-light transition-colors border border-surface-light/30"
        >
          <X size={13} />
          Salir
        </button>
      </div>
    </div>
  )
}
