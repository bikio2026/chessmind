import { CLASSIFICATIONS } from '../../hooks/useTrainerEngine'
import { ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react'

const FEEDBACK_STYLES = {
  excellent: 'bg-move-excellent/5 border-move-excellent/20',
  good: 'bg-move-good-light/5 border-move-good-light/20',
  inaccuracy: 'bg-move-inaccuracy/5 border-move-inaccuracy/20',
  mistake: 'bg-move-mistake/5 border-move-mistake/20',
  blunder: 'bg-move-blunder/5 border-move-blunder/20',
}

/**
 * Feedback card for Guided Training.
 * Shows: classification + LLM streaming explanation + thumbs up/down + continue button.
 */
export function GuidedFeedbackCard({
  attempt,
  feedbackText,
  isLoadingFeedback,
  onRateFeedback,
  onContinue,
}) {
  if (!attempt) return null

  const cls = attempt.classification
  const info = cls ? CLASSIFICATIONS[cls] : null
  const cardStyle = cls ? FEEDBACK_STYLES[cls] || '' : 'bg-surface-alt border-surface-light/30'

  const isPositive = attempt.isCorrect || cls === 'excellent' || cls === 'good'

  return (
    <div className={`rounded-xl border p-3 animate-fadeIn ${cardStyle}`}>
      {/* Classification header */}
      {info && (
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-lg">{info.symbol}</span>
          <span className="text-sm font-bold" style={{ color: info.color }}>
            {attempt.isCorrect ? '¡Correcto!' : info.label}
          </span>
          {!attempt.isCorrect && attempt.scoreDiff > 0 && (
            <span className="text-xs text-text-muted ml-auto font-mono">
              -{attempt.scoreDiff} cp
            </span>
          )}
        </div>
      )}

      {/* Positive feedback banner */}
      {isPositive && (
        <div className="text-sm font-medium text-move-excellent mb-1.5">
          {attempt.isCorrect ? '¡Encontraste la mejor jugada!' : '¡Bien!'}
        </div>
      )}

      {/* Move comparison */}
      {!attempt.isCorrect && attempt.bestMoveSan && (
        <div className="text-xs text-text-dim mt-1">
          Jugaste{' '}
          <span className="font-mono font-medium text-text">{attempt.san}</span>
          {' — '}mejor era{' '}
          <span className="font-mono font-medium" style={{ color: 'var(--color-move-excellent)' }}>
            {attempt.bestMoveSan}
          </span>
        </div>
      )}

      {/* LLM explanation */}
      {(feedbackText || isLoadingFeedback) && (
        <div className="mt-2 border-t border-current/10 pt-2">
          <p className="text-xs text-text-dim leading-relaxed">
            {feedbackText}
            {isLoadingFeedback && (
              <span className="inline-block w-1.5 h-3 bg-accent/60 ml-0.5 animate-pulse rounded-sm" />
            )}
            {!feedbackText && isLoadingFeedback && (
              <span className="italic text-text-muted">Analizando...</span>
            )}
          </p>
        </div>
      )}

      {/* Footer: thumbs + continue */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-current/10">
        {/* Thumbs rating */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onRateFeedback('up')}
            className={`p-1.5 rounded-lg transition-colors ${
              attempt.feedbackRating === 'up'
                ? 'bg-move-excellent/20 text-move-excellent'
                : 'text-text-muted/40 hover:text-move-excellent hover:bg-move-excellent/10'
            }`}
            title="Feedback útil"
          >
            <ThumbsUp size={14} />
          </button>
          <button
            onClick={() => onRateFeedback('down')}
            className={`p-1.5 rounded-lg transition-colors ${
              attempt.feedbackRating === 'down'
                ? 'bg-move-blunder/20 text-move-blunder'
                : 'text-text-muted/40 hover:text-move-blunder hover:bg-move-blunder/10'
            }`}
            title="Feedback no útil"
          >
            <ThumbsDown size={14} />
          </button>
        </div>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 text-accent rounded-lg text-xs font-medium hover:bg-accent/30 transition-colors"
        >
          Continuar
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}
