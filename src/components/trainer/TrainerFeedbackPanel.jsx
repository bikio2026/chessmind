import { Brain, Loader2, AlertCircle } from 'lucide-react'

/**
 * Panel that displays LLM-generated semantic feedback for each trainer move.
 * Shows streaming text as it arrives from the API.
 */
export function TrainerFeedbackPanel({ narrative, isAnalyzing, error }) {
  // Nothing to show yet
  if (!narrative && !isAnalyzing && !error) return null

  return (
    <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-3">
      <div className="flex items-center gap-1.5 mb-2">
        <Brain size={12} className="text-accent shrink-0" />
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
          Análisis semántico
        </h3>
        {isAnalyzing && (
          <Loader2 size={11} className="animate-spin text-accent ml-auto" />
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-start gap-2 text-xs text-move-inaccuracy">
          <AlertCircle size={12} className="shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Narrative text (streaming) */}
      {narrative && (
        <p className="text-sm text-text-dim leading-relaxed">
          {narrative}
          {isAnalyzing && (
            <span className="inline-block w-1.5 h-3.5 bg-accent/60 ml-0.5 animate-pulse rounded-sm" />
          )}
        </p>
      )}

      {/* Loading placeholder (no text yet) */}
      {isAnalyzing && !narrative && !error && (
        <p className="text-xs text-text-muted italic">Analizando jugada...</p>
      )}
    </div>
  )
}
