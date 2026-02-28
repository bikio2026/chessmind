import { CLASSIFICATIONS } from '../hooks/useTrainerEngine'
import { Lightbulb, Eye, EyeOff, Target, ChevronRight, Cpu, BookOpen } from 'lucide-react'

const FEEDBACK_STYLES = {
  excellent: 'bg-move-excellent/5 border-move-excellent/20',
  good: 'bg-move-good-light/5 border-move-good-light/20',
  inaccuracy: 'bg-move-inaccuracy/5 border-move-inaccuracy/20',
  mistake: 'bg-move-mistake/5 border-move-mistake/20',
  blunder: 'bg-move-blunder/5 border-move-blunder/20',
}

/**
 * TrainingPanel — Right-panel UI for Analyzer training mode.
 * Shows progressive hints, move attempt feedback, and reference mode controls.
 */
export function TrainingPanel({ training }) {
  const {
    referenceMode, toggleReferenceMode, hasGameMove, referenceMoveSan,
    hideFutureMoves, toggleHideFutureMoves,
    hintLevel, hintText, isLoadingHint, requestHint, bestMoveSan,
    moveAttempt, feedbackText, isLoadingFeedback, clearAttempt,
  } = training

  const canHint = !!referenceMoveSan && !moveAttempt

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="bg-accent/10 rounded-xl border border-accent/20 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Target size={16} className="text-accent" />
          <h3 className="text-sm font-bold text-accent">Modo Entrenamiento</h3>
        </div>
        <p className="text-xs text-text-dim">
          Encontrá la mejor jugada. Podés pedir pistas antes de intentar.
        </p>

        {/* Controls row */}
        <div className="flex items-center gap-2 mt-2">
          {/* Reference mode toggle */}
          {hasGameMove && (
            <button
              onClick={toggleReferenceMode}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
                referenceMode === 'engine'
                  ? 'bg-accent/15 text-accent'
                  : 'bg-move-book/15 text-move-book'
              }`}
              title={referenceMode === 'engine'
                ? 'Referencia: mejor jugada del motor'
                : 'Referencia: jugada de la partida'}
            >
              {referenceMode === 'engine' ? <Cpu size={10} /> : <BookOpen size={10} />}
              {referenceMode === 'engine' ? 'Motor' : 'Partida'}
            </button>
          )}

          {/* Hide future moves toggle */}
          <button
            onClick={toggleHideFutureMoves}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
              hideFutureMoves
                ? 'bg-surface-light text-text-dim'
                : 'bg-surface-light text-text-muted'
            }`}
            title={hideFutureMoves ? 'Jugadas futuras ocultas' : 'Jugadas futuras visibles'}
          >
            {hideFutureMoves ? <EyeOff size={10} /> : <Eye size={10} />}
            {hideFutureMoves ? 'Ocultas' : 'Visibles'}
          </button>
        </div>
      </div>

      {/* Hint section */}
      {!moveAttempt && (
        <HintSection
          hintLevel={hintLevel}
          hintText={hintText}
          isLoading={isLoadingHint}
          referenceMoveSan={referenceMoveSan}
          canHint={canHint}
          onRequestHint={requestHint}
        />
      )}

      {/* Move attempt feedback */}
      {moveAttempt && (
        <AttemptFeedback
          attempt={moveAttempt}
          feedbackText={feedbackText}
          isLoadingFeedback={isLoadingFeedback}
          onAdvance={clearAttempt}
        />
      )}

      {/* Idle state */}
      {!moveAttempt && hintLevel === 0 && (
        <div className="text-xs text-text-muted italic text-center py-2">
          Mové una pieza para intentar, o pedí una pista
        </div>
      )}
    </div>
  )
}

function HintSection({ hintLevel, hintText, isLoading, referenceMoveSan, canHint, onRequestHint }) {
  if (hintLevel === 0) {
    return (
      <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-3">
        <button
          onClick={onRequestHint}
          disabled={!canHint}
          className={`flex items-center gap-1.5 text-xs transition-colors ${
            canHint
              ? 'text-text-muted hover:text-move-inaccuracy'
              : 'text-text-muted/50 cursor-not-allowed'
          }`}
        >
          <Lightbulb size={13} />
          <span>{canHint ? 'Pedir pista' : 'Esperando motor...'}</span>
        </button>
      </div>
    )
  }

  if (hintLevel === 1) {
    return (
      <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-3 animate-fadeIn">
        <div className="text-xs text-text-dim flex items-start gap-1.5">
          <Lightbulb size={12} className="text-move-inaccuracy shrink-0 mt-0.5" />
          <span className="italic leading-relaxed">
            {hintText || (isLoading ? 'Pensando...' : 'No se pudo generar la pista')}
            {isLoading && (
              <span className="inline-block w-1.5 h-3 bg-accent/60 ml-0.5 animate-pulse rounded-sm" />
            )}
          </span>
        </div>
        <button
          onClick={onRequestHint}
          className="flex items-center gap-1.5 text-[10px] text-text-muted hover:text-move-inaccuracy transition-colors mt-2 ml-4"
        >
          <Eye size={10} />
          <span>Mostrar jugada</span>
        </button>
      </div>
    )
  }

  // hintLevel === 2: revealed
  return (
    <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-3 animate-fadeIn">
      {hintText && (
        <div className="text-xs text-text-dim flex items-start gap-1.5 mb-2">
          <Lightbulb size={12} className="text-move-inaccuracy shrink-0 mt-0.5" />
          <span className="italic leading-relaxed">{hintText}</span>
        </div>
      )}
      <div className="text-xs text-text-dim flex items-center gap-1.5 ml-4">
        <Eye size={11} className="text-move-book shrink-0" />
        <span className="text-text-muted">Mejor jugada: </span>
        <span className="font-mono text-move-book font-medium">{referenceMoveSan}</span>
      </div>
    </div>
  )
}

function AttemptFeedback({ attempt, feedbackText, isLoadingFeedback, onAdvance }) {
  const cls = attempt.classification
  const info = cls ? CLASSIFICATIONS[cls] : null
  const cardStyle = cls ? FEEDBACK_STYLES[cls] || '' : 'bg-surface-alt border-surface-light/30'

  return (
    <div className={`rounded-xl border p-3 animate-fadeIn ${cardStyle}`}>
      {/* Classification header */}
      {info && (
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{info.symbol}</span>
          <span className="text-sm font-bold" style={{ color: info.color }}>
            {attempt.isCorrect ? '¡Correcto!' : info.label}
          </span>
          {!attempt.isCorrect && attempt.scoreDiff > 0 && (
            <span className="text-xs text-text-muted ml-auto">
              −{attempt.scoreDiff} cp
            </span>
          )}
        </div>
      )}

      {/* Move comparison */}
      {!attempt.isCorrect && attempt.bestMoveSan && (
        <div className="text-xs text-text-dim mt-1">
          Jugaste <span className="font-mono font-medium text-text">{attempt.san}</span>
          {' — '}mejor era{' '}
          <span className="font-mono font-medium" style={{ color: 'var(--color-move-excellent)' }}>
            {attempt.bestMoveSan}
          </span>
        </div>
      )}

      {attempt.isCorrect && (
        <p className="text-xs text-text-dim">
          Encontraste la mejor jugada
          {attempt.bestMoveSan ? `: ${attempt.bestMoveSan}` : ''}
        </p>
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

      {/* Advance button */}
      <button
        onClick={onAdvance}
        className="flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 transition-colors mt-3 font-medium"
      >
        <ChevronRight size={13} />
        Avanzar
      </button>
    </div>
  )
}
