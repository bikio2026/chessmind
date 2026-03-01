import { Crosshair, Lightbulb, Eye } from 'lucide-react'
import { GuidedMoveList } from './GuidedMoveList'
import { GuidedFeedbackCard } from './GuidedFeedbackCard'
import { GuidedSummary } from './GuidedSummary'

const SIDE_OPTIONS = [
  { value: 'w', label: 'Blancas' },
  { value: 'b', label: 'Negras' },
  { value: 'both', label: 'Ambos' },
]

/**
 * GuidedTrainingPanel — main right-panel component for Guided Training mode.
 * Composes: controls + move list + feedback card (or hints) + progress bar + summary.
 */
export function GuidedTrainingPanel({
  guided,
  history,
  currentMoveIndex,
  onMoveClick,
}) {
  const {
    playerSide, setPlayerSide,
    currentPhase,
    attempts, currentAttempt, isEvaluating,
    feedbackText, isLoadingFeedback, rateFeedback,
    hintLevel, hintText, isLoadingHint, requestHint, referenceMoveSan,
    continueTraining, finishSession, resetSession, toggleGuidedMode,
    sessionStats, totalPlayerMoves, attemptedCount,
    isPlayerTurn, hasFutureMoves,
  } = guided

  // Complete phase → show summary
  if (currentPhase === 'complete') {
    return (
      <GuidedSummary
        sessionStats={sessionStats}
        attempts={attempts}
        onReset={resetSession}
        onExit={toggleGuidedMode}
      />
    )
  }

  const canHint = !!referenceMoveSan && !currentAttempt && currentPhase === 'waiting'
  const progress = totalPlayerMoves > 0 ? Math.round((attemptedCount / totalPlayerMoves) * 100) : 0

  return (
    <div className="space-y-3">
      {/* Header + side selector */}
      <div className="bg-accent/10 rounded-xl border border-accent/20 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Crosshair size={16} className="text-accent" />
          <h3 className="text-sm font-bold text-accent">Entrenamiento Guiado</h3>
        </div>
        <p className="text-xs text-text-dim mb-2">
          Encontrá la mejor jugada en cada posición
        </p>

        {/* Side selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-text-muted uppercase tracking-wider">Lado:</span>
          {SIDE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setPlayerSide(opt.value)}
              className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
                playerSide === opt.value
                  ? 'bg-accent/20 text-accent'
                  : 'bg-surface-light/50 text-text-dim hover:text-text'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Move list with annotations */}
      <GuidedMoveList
        history={history}
        attempts={attempts}
        currentMoveIndex={currentMoveIndex}
        playerSide={playerSide}
        onMoveClick={onMoveClick}
      />

      {/* Feedback card (when attempt exists) */}
      {currentAttempt && currentPhase === 'feedback' && (
        <GuidedFeedbackCard
          attempt={currentAttempt}
          feedbackText={feedbackText}
          isLoadingFeedback={isLoadingFeedback}
          onRateFeedback={rateFeedback}
          onContinue={continueTraining}
        />
      )}

      {/* Evaluating spinner */}
      {isEvaluating && (
        <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-3 text-center">
          <div className="text-xs text-text-muted italic">Evaluando jugada...</div>
        </div>
      )}

      {/* Hint section (when waiting for attempt) */}
      {!currentAttempt && currentPhase === 'waiting' && hasFutureMoves && isPlayerTurn && (
        <HintSection
          hintLevel={hintLevel}
          hintText={hintText}
          isLoading={isLoadingHint}
          referenceMoveSan={referenceMoveSan}
          canHint={canHint}
          onRequestHint={requestHint}
        />
      )}

      {/* Waiting for opponent auto-advance */}
      {!currentAttempt && currentPhase === 'waiting' && hasFutureMoves && !isPlayerTurn && (
        <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-3 text-center">
          <div className="text-xs text-text-muted italic">
            Turno del rival...
          </div>
        </div>
      )}

      {/* No game loaded */}
      {!hasFutureMoves && attempts.size === 0 && (
        <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-4 text-center">
          <p className="text-xs text-text-muted">
            Cargá una partida desde la <span className="font-medium text-text">Biblioteca</span> para empezar
          </p>
        </div>
      )}

      {/* Progress bar */}
      {totalPlayerMoves > 0 && attempts.size > 0 && (
        <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-3">
          <div className="flex items-center justify-between text-[10px] text-text-muted mb-1.5">
            <span>Progreso: {attemptedCount}/{totalPlayerMoves} jugadas</span>
            <span>{sessionStats.accuracy}% precisión</span>
          </div>
          <div className="h-1.5 bg-surface-light rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {hasFutureMoves && (
            <button
              onClick={finishSession}
              className="text-[10px] text-text-muted/60 hover:text-text-muted mt-2 transition-colors"
            >
              Finalizar sesión
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ── Hint sub-component (same UX pattern as TrainingPanel) ──
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
        <span className="text-text-muted/60 text-[10px]">(flecha verde)</span>
      </div>
    </div>
  )
}
