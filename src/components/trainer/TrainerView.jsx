import { useCallback, useEffect, useRef } from 'react'
import { useTrainerEngine } from '../../hooks/useTrainerEngine'
import { useOpeningTrainer } from '../../hooks/useOpeningTrainer'
import { useTrainerLLM } from '../../hooks/useTrainerLLM'
import { useTrainerData } from '../../hooks/useTrainerData'
import { buildSummaryPrompt } from '../../lib/trainerPromptBuilder'
import { OpeningSelector } from './OpeningSelector'
import { TrainerSession } from './TrainerSession'
import { TrainerFeedbackPanel } from './TrainerFeedbackPanel'
import { CLASSIFICATIONS } from '../../hooks/useTrainerEngine'
import { BookOpen, ArrowLeft, Trophy, Target, AlertTriangle } from 'lucide-react'

/**
 * TrainerView — Main container for the Opening Trainer tab.
 * Instantiates hooks and delegates to sub-components by phase.
 */
export function TrainerView() {
  const trainerEngine = useTrainerEngine()
  const trainer = useOpeningTrainer({ trainerEngine })
  const summaryLLM = useTrainerLLM()
  const { saveSession, getOpeningStats } = useTrainerData()

  // Track whether we already saved/analyzed this summary
  const savedRef = useRef(null)

  const handleSelectOpening = useCallback((opening) => {
    trainer.startSession(opening)
    summaryLLM.clear()
    savedRef.current = null
  }, [trainer.startSession, summaryLLM.clear])

  // When entering summary phase: save session + trigger LLM narrative
  useEffect(() => {
    if (trainer.phase !== 'summary' || !trainer.sessionSummary) return
    // Only save/analyze once per summary
    const summaryId = trainer.sessionSummary.movesPgn
    if (savedRef.current === summaryId) return
    savedRef.current = summaryId

    // Save to localStorage
    saveSession(trainer.sessionSummary)

    // Generate LLM narrative
    const prompt = buildSummaryPrompt(trainer.sessionSummary)
    if (prompt) {
      summaryLLM.analyze(prompt, { promptVersion: 'trainerSummary' })
    }
  }, [trainer.phase, trainer.sessionSummary])

  // Phase: select
  if (trainer.phase === 'select') {
    return (
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
            <BookOpen size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-text">Elegí una apertura</h2>
            <p className="text-xs text-text-dim">Seleccioná la apertura que querés practicar y leé su explicación antes de empezar</p>
          </div>
        </div>

        <OpeningSelector onSelect={handleSelectOpening} getOpeningStats={getOpeningStats} />
      </div>
    )
  }

  // Phase: playing
  if (trainer.phase === 'playing') {
    return <TrainerSession {...trainer} />
  }

  // Phase: summary
  const summary = trainer.sessionSummary
  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <Trophy size={40} className="mx-auto text-accent mb-3" />
          <h2 className="text-xl font-bold text-text mb-1">Sesión completada</h2>
          <p className="text-sm text-text-dim">
            {summary?.opening?.name} — {summary?.playerColor === 'white' ? 'Blancas' : 'Negras'}
          </p>
        </div>

        {summary && (
          <div className="space-y-4">
            {/* Accuracy */}
            <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-4 text-center">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Precisión</p>
              <p className="text-3xl font-bold text-accent">
                {Math.round(summary.accuracy * 100)}%
              </p>
              <p className="text-xs text-text-dim mt-1">
                {summary.totalMoves} jugadas evaluadas · Teoría hasta jugada {summary.theoryDepth}
              </p>
            </div>

            {/* Classifications breakdown */}
            <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-4">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Clasificaciones</h3>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(summary.classifications).map(([cls, count]) => {
                  const info = CLASSIFICATIONS[cls]
                  if (!info || count === 0) return null
                  return (
                    <div key={cls} className="flex items-center gap-2 text-sm">
                      <span className="text-base">{info.symbol}</span>
                      <span style={{ color: info.color }} className="font-medium">{count}</span>
                      <span className="text-xs text-text-muted">{info.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Key moments */}
            {summary.keyMoments.length > 0 && (
              <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-4">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <AlertTriangle size={11} />
                  Momentos clave
                </h3>
                <div className="space-y-2">
                  {summary.keyMoments.map((moment, i) => {
                    const info = CLASSIFICATIONS[moment.classification]
                    return (
                      <div key={i} className="flex items-baseline gap-2 text-xs">
                        <span className="text-base shrink-0">{info?.symbol}</span>
                        <span className="text-text-muted shrink-0">Jugada {moment.moveNumber}:</span>
                        <span className="font-mono text-text">{moment.movePlayed}</span>
                        <span className="text-text-muted">→</span>
                        <span className="font-mono" style={{ color: 'var(--color-move-excellent)' }}>
                          {moment.bestMove}
                        </span>
                        <span className="text-text-muted">({moment.scoreDiff} cp)</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* LLM Summary Narrative */}
            <TrainerFeedbackPanel
              narrative={summaryLLM.narrative}
              isAnalyzing={summaryLLM.isAnalyzing}
              error={summaryLLM.error}
            />

            {/* Deviation info */}
            {summary.deviationInfo && (
              <div className="text-xs text-text-dim text-center">
                Te saliste de la teoría en jugada{' '}
                {Math.floor(summary.deviationInfo.moveIndex / 2) + 1}:{' '}
                <span className="font-mono text-text">{summary.deviationInfo.playedMove}</span>
                {' '}en vez de{' '}
                <span className="font-mono text-move-book">{summary.deviationInfo.expectedMove}</span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => handleSelectOpening(summary?.opening)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors text-sm"
          >
            <Target size={16} />
            Reintentar
          </button>
          <button
            onClick={trainer.abandonSession}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-alt rounded-lg text-text-dim hover:text-text hover:bg-surface-light transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Otra apertura
          </button>
        </div>
      </div>
    </div>
  )
}
