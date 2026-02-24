import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { Chess } from 'chess.js'
import { Board } from '../Board'
import { TrainerMoveList } from './TrainerMoveList'
import { TrainerFeedbackPanel } from './TrainerFeedbackPanel'
import { LLMSelector } from '../LLMSelector'
import { CLASSIFICATIONS } from '../../hooks/useTrainerEngine'
import { useTrainerLLM } from '../../hooks/useTrainerLLM'
import { buildTrainerPrompt } from '../../lib/trainerPromptBuilder'
import { THEMES, DEFAULT_THEME } from '../../lib/pieceThemes.jsx'
import { ArrowLeft, BookOpen, Flag, Zap, Loader2, Lightbulb, Eye, EyeOff, RotateCcw, Brain, AlertCircle, Info } from 'lucide-react'

/**
 * In-game layout for the Opening Trainer.
 * Composes Board + right-side panels (theory, feedback, moves, controls).
 */
export function TrainerSession({
  opening,
  playerColor,
  position,
  history,
  turn,
  isGameOver,
  lastMove,
  isInTheory,
  theoryMoveIndex,
  deviationInfo,
  getTheoryPreview,
  moveEvaluations,
  isEvaluating,
  pendingFeedback,
  isEngineThinking,
  engineStrength,
  setEngineStrength,
  makeTrainerMove,
  endSession,
  abandonSession,
  restartSession,
}) {
  const orientation = playerColor

  // Guided mode: show all upcoming theory moves (off by default → forces recall)
  const [guidedMode, setGuidedMode] = useState(() => {
    return localStorage.getItem('chessmind-trainer-guided') === 'true'
  })
  // Hint: reveals only the next expected move (resets each move)
  const [hintRevealed, setHintRevealed] = useState(false)

  // Reset hint when a new move is played
  useEffect(() => { setHintRevealed(false) }, [history.length])

  // Persist guided mode
  useEffect(() => {
    localStorage.setItem('chessmind-trainer-guided', String(guidedMode))
  }, [guidedMode])

  // Piece theme from localStorage (consistent with analyzer)
  const [pieceTheme] = useState(() => localStorage.getItem('chessmind-theme') || DEFAULT_THEME)
  const customPieces = useMemo(() => {
    const theme = THEMES[pieceTheme]
    return theme?.getPieces() || undefined
  }, [pieceTheme])

  // ── LLM semantic feedback ──
  const llm = useTrainerLLM()
  const lastAnalyzedRef = useRef(null)
  const [llmEnabled, setLlmEnabled] = useState(() => {
    return localStorage.getItem('chessmind-trainer-llm') !== 'false'
  })

  // Production detection (no Ollama)
  const isProduction = typeof window !== 'undefined' && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')

  // LLM provider/model state (shared localStorage keys with analyzer)
  const [llmProvider, setLlmProvider] = useState(() => {
    const saved = localStorage.getItem('chessmind-llm-provider') || 'claude'
    if (isProduction && saved === 'ollama') return 'groq'
    return saved
  })
  const [llmModel, setLlmModel] = useState(() => {
    return localStorage.getItem('chessmind-llm-model') || ''
  })

  // Persist LLM toggle
  useEffect(() => {
    localStorage.setItem('chessmind-trainer-llm', String(llmEnabled))
  }, [llmEnabled])

  function handleLLMChange(provider, model) {
    setLlmProvider(provider)
    setLlmModel(model)
    localStorage.setItem('chessmind-llm-provider', provider)
    localStorage.setItem('chessmind-llm-model', model)
    lastAnalyzedRef.current = null // allow re-analysis with new model
    llm.clear()
  }

  function handleToggleLLM() {
    setLlmEnabled(prev => {
      const next = !prev
      localStorage.setItem('chessmind-trainer-llm', String(next))
      if (!next) llm.clear()
      else lastAnalyzedRef.current = null // re-analyze on re-enable
      return next
    })
  }

  // Trigger LLM analysis when pendingFeedback changes or model changes
  useEffect(() => {
    if (!llmEnabled || !pendingFeedback || !opening) return
    // Don't re-analyze the same move with the same model
    const analysisKey = `${pendingFeedback.moveIndex}:${llmProvider}:${llmModel}`
    if (lastAnalyzedRef.current === analysisKey) return
    lastAnalyzedRef.current = analysisKey

    const cls = pendingFeedback.evaluation?.classification
    if (!cls) return

    const moveNumber = Math.floor(pendingFeedback.moveIndex / 2) + 1
    const side = playerColor === 'white' ? 'Blancas' : 'Negras'

    const prompt = buildTrainerPrompt({
      opening,
      moveNumber,
      side,
      playedMove: pendingFeedback.movePlayed,
      bestMove: pendingFeedback.bestMove || pendingFeedback.movePlayed,
      classification: cls,
      cpLoss: pendingFeedback.evaluation.scoreDiff || 0,
      fen: position, // current position (after the move)
      history,
      isDeviation: !!deviationInfo && deviationInfo.moveIndex === pendingFeedback.moveIndex,
      expectedTheoryMove: deviationInfo?.expectedMove,
    })

    if (prompt) llm.analyze(prompt)
  }, [llmEnabled, pendingFeedback, opening, playerColor, position, history, deviationInfo, llmProvider, llmModel])

  // Synchronous move wrapper — Board's onDrop needs sync return value
  const handleMove = useCallback((from, to, promotion) => {
    try {
      const game = new Chess(position)
      const result = game.move({ from, to, promotion: promotion || undefined })
      if (!result) return null
    } catch {
      return null
    }
    // Valid move — kick off async evaluation (fire and forget)
    makeTrainerMove(from, to, promotion)
    return { from, to }
  }, [position, makeTrainerMove])

  const theoryPreview = getTheoryPreview()
  const feedback = pendingFeedback
  const feedbackInfo = feedback?.evaluation?.classification
    ? CLASSIFICATIONS[feedback.evaluation.classification]
    : null

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={abandonSession}
            className="flex items-center gap-1.5 text-sm text-text-dim hover:text-text transition-colors"
          >
            <ArrowLeft size={14} />
            Volver
          </button>
          <div className="w-px h-5 bg-surface-light" />
          <h2 className="text-base font-bold text-text">{opening?.name}</h2>
          <span className="text-xs font-mono text-text-muted">{opening?.eco}</span>
        </div>

        {/* Status badges + LLM Selector */}
        <div className="flex items-center gap-2">
          {isInTheory ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-move-book/15 text-move-book">
              <BookOpen size={12} />
              En teoría
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-accent/15 text-accent">
              Juego libre
            </span>
          )}
          {(isEngineThinking || isEvaluating) && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-surface-light text-text-dim">
              <Loader2 size={12} className="animate-spin" />
              {isEngineThinking ? 'Pensando...' : 'Evaluando...'}
            </span>
          )}
          {/* LLM Model Selector (same component as analyzer) */}
          <LLMSelector
            provider={llmProvider}
            model={llmModel}
            providerStatus={llm.providerStatus}
            enabled={llmEnabled}
            isProduction={isProduction}
            onChange={handleLLMChange}
            onToggle={handleToggleLLM}
          />
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: Board */}
        <div className="flex flex-col items-center gap-3 shrink-0 self-center lg:self-start">
          <Board
            position={position}
            onMove={handleMove}
            orientation={orientation}
            lastMove={lastMove}
            pieces={customPieces}
          />

          {/* Turn indicator */}
          <div className="flex items-center gap-2 text-sm text-text-dim">
            <span className={`w-3 h-3 rounded-full border border-surface-light ${turn === 'w' ? 'bg-eval-white' : 'bg-eval-black'}`} />
            Turno: <span className="font-medium text-text">{turn === 'w' ? 'Blancas' : 'Negras'}</span>
            {isGameOver && (
              <span className="text-accent font-semibold ml-2">Partida terminada</span>
            )}
          </div>
        </div>

        {/* Right: Panels */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          {/* Theory Tracker */}
          <TheoryTracker
            isInTheory={isInTheory}
            theoryMoveIndex={theoryMoveIndex}
            theoryPreview={theoryPreview}
            deviationInfo={deviationInfo}
            opening={opening}
            guidedMode={guidedMode}
            onToggleGuided={() => setGuidedMode(prev => !prev)}
            hintRevealed={hintRevealed}
            onRevealHint={() => setHintRevealed(true)}
          />

          {/* Game Over banner */}
          {isGameOver && (
            <div className="bg-accent/15 rounded-xl border border-accent/30 p-4 text-center animate-fadeIn">
              <p className="text-sm font-bold text-accent mb-2">¡Partida terminada!</p>
              <button
                onClick={endSession}
                className="px-4 py-2 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Ver resumen
              </button>
            </div>
          )}

          {/* Move Feedback + integrated LLM explanation */}
          {feedback && feedbackInfo && (
            <FeedbackCard
              feedback={feedback}
              info={feedbackInfo}
              llmNarrative={llmEnabled ? llm.narrative : ''}
              llmAnalyzing={llmEnabled && llm.isAnalyzing}
              llmError={llmEnabled ? llm.error : null}
            />
          )}

          {/* Move List */}
          <TrainerMoveList
            history={history}
            moveEvaluations={moveEvaluations}
            playerColor={playerColor}
          />

          {/* Strength Slider (tooltip-based info) */}
          <StrengthSlider value={engineStrength} onChange={setEngineStrength} />

          {/* Session Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={abandonSession}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-surface-alt rounded-lg text-text-dim hover:text-text hover:bg-surface-light transition-colors text-sm"
            >
              <ArrowLeft size={14} />
              Volver
            </button>
            {restartSession && (
              <button
                onClick={restartSession}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-surface-alt rounded-lg text-text-dim hover:text-text hover:bg-surface-light transition-colors text-sm"
              >
                <RotateCcw size={14} />
                Reiniciar
              </button>
            )}
            <button
              onClick={endSession}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-accent/15 rounded-lg text-accent hover:bg-accent/25 transition-colors text-sm font-medium"
            >
              <Flag size={14} />
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Inline sub-components ─── */

const FEEDBACK_STYLES = {
  book: 'bg-move-book/10 border-move-book/30',
  excellent: 'bg-move-excellent/10 border-move-excellent/30',
  good: 'bg-move-good-light/10 border-move-good-light/30',
  inaccuracy: 'bg-move-inaccuracy/10 border-move-inaccuracy/30',
  mistake: 'bg-move-mistake/10 border-move-mistake/30',
  blunder: 'bg-move-blunder/10 border-move-blunder/30',
}

function TheoryTracker({
  isInTheory, theoryMoveIndex, theoryPreview, deviationInfo, opening,
  guidedMode, onToggleGuided, hintRevealed, onRevealHint,
}) {
  if (!opening) return null

  const total = opening.mainLine.length
  const completed = Math.max(0, Math.min(theoryMoveIndex + 1, total))
  const progress = total > 0 ? (completed / total) * 100 : 0

  return (
    <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Línea principal</h3>
        <div className="flex items-center gap-2">
          {/* Guided mode toggle */}
          {isInTheory && (
            <button
              onClick={onToggleGuided}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
                guidedMode
                  ? 'bg-move-book/15 text-move-book'
                  : 'bg-surface-light text-text-muted hover:text-text-dim'
              }`}
              title={guidedMode ? 'Modo guiado: muestra todas las jugadas' : 'Sin guía: tenés que recordar'}
            >
              {guidedMode ? <Eye size={10} /> : <EyeOff size={10} />}
              {guidedMode ? 'Guiado' : 'Sin guía'}
            </button>
          )}
          <span className="text-[10px] text-text-muted">
            {completed}/{total} jugadas
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-surface rounded-full overflow-hidden mb-2">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor: isInTheory ? 'var(--color-move-book)' : 'var(--color-accent)',
          }}
        />
      </div>

      {/* Theory hint area — 3 modes */}
      {isInTheory && theoryPreview.length > 0 && (
        guidedMode ? (
          /* Modo guiado: muestra todas las próximas */
          <div className="text-xs text-text-dim">
            <span className="text-text-muted">Próximas: </span>
            <span className="font-mono">{theoryPreview.join(' ')}</span>
          </div>
        ) : hintRevealed ? (
          /* Pista revelada: solo la próxima jugada */
          <div className="text-xs text-text-dim flex items-center gap-1.5">
            <Lightbulb size={11} className="text-move-inaccuracy shrink-0" />
            <span className="text-text-muted">Jugada esperada: </span>
            <span className="font-mono text-move-book font-medium">{theoryPreview[0]}</span>
          </div>
        ) : (
          /* Sin pista: botón para revelar */
          <button
            onClick={onRevealHint}
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-move-inaccuracy transition-colors"
          >
            <Lightbulb size={12} />
            <span>Pista</span>
          </button>
        )
      )}

      {/* Deviation info */}
      {deviationInfo && (
        <div className="text-xs mt-1">
          <span className="text-accent font-medium">
            Desvío en jugada {Math.floor(deviationInfo.moveIndex / 2) + 1}:{' '}
          </span>
          <span className="text-text-dim">
            jugaste <span className="font-mono text-text">{deviationInfo.playedMove}</span>
            {' '}en vez de <span className="font-mono text-move-book">{deviationInfo.expectedMove}</span>
          </span>
        </div>
      )}

      {/* Theory exhausted */}
      {!isInTheory && !deviationInfo && (
        <p className="text-xs text-text-muted">Teoría completada — jugando libremente</p>
      )}
    </div>
  )
}

function FeedbackCard({ feedback, info, llmNarrative, llmAnalyzing, llmError }) {
  const cls = feedback.evaluation.classification
  const isBook = cls === 'book'
  const isError = cls === 'inaccuracy' || cls === 'mistake' || cls === 'blunder'
  const cardStyle = FEEDBACK_STYLES[cls] || ''
  const [expanded, setExpanded] = useState(isError) // auto-expand for errors

  const showLLM = (llmNarrative || llmAnalyzing || llmError) && (isError || isBook || cls === 'excellent' || cls === 'good')

  return (
    <div className={`rounded-xl border p-3 animate-fadeIn ${cardStyle}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{info.symbol}</span>
        <span className="text-sm font-bold" style={{ color: info.color }}>
          {info.label}
        </span>
        {!isBook && feedback.evaluation.scoreDiff > 0 && (
          <span className="text-xs text-text-muted ml-auto">
            −{feedback.evaluation.scoreDiff} cp
          </span>
        )}
      </div>

      {!isBook && feedback.bestMove && feedback.bestMove !== feedback.movePlayed && (
        <div className="text-xs text-text-dim mt-1">
          Jugaste <span className="font-mono font-medium text-text">{feedback.movePlayed}</span>
          {' — '}mejor era{' '}
          <span className="font-mono font-medium" style={{ color: 'var(--color-move-excellent)' }}>
            {feedback.bestMove}
          </span>
        </div>
      )}

      {isBook && (
        <p className="text-xs text-text-dim">Jugada de libro — seguís la línea principal</p>
      )}

      {/* LLM explanation — expandable */}
      {showLLM && (
        <div className="mt-2 border-t border-current/10 pt-2">
          <button
            onClick={() => setExpanded(prev => !prev)}
            className="flex items-center gap-1.5 text-[11px] text-text-muted hover:text-text-dim transition-colors"
          >
            <Brain size={11} />
            {expanded ? 'Ocultar análisis' : '¿Por qué?'}
          </button>
          {expanded && (
            <div className="text-xs leading-relaxed mt-1.5">
              {llmError && (
                <p className="text-move-mistake flex items-center gap-1.5">
                  <AlertCircle size={11} className="shrink-0" />
                  {llmError}
                </p>
              )}
              {!llmError && (
                <p className="text-text-dim">
                  {llmNarrative}
                  {llmAnalyzing && (
                    <span className="inline-block w-1.5 h-3 bg-accent/60 ml-0.5 animate-pulse rounded-sm" />
                  )}
                  {!llmNarrative && llmAnalyzing && (
                    <span className="italic text-text-muted">Analizando...</span>
                  )}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function StrengthSlider({ value, onChange }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const label =
    value <= 3 ? 'Principiante' :
    value <= 8 ? 'Intermedio' :
    value <= 14 ? 'Avanzado' :
    value <= 18 ? 'Experto' : 'Máximo'

  return (
    <div className="bg-surface-alt rounded-xl border border-surface-light/30 p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
          <Zap size={11} />
          Nivel del motor
          <span className="relative">
            <button
              onClick={() => setShowTooltip(prev => !prev)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="text-text-muted hover:text-text-dim transition-colors"
            >
              <Info size={11} />
            </button>
            {showTooltip && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 bg-surface border border-surface-light rounded-lg shadow-xl p-3 z-50 text-[11px] text-text-dim font-normal normal-case tracking-normal leading-relaxed">
                <p className="font-semibold text-text mb-1.5">Stockfish Skill Level (0–20)</p>
                <p className="mb-1.5">Controla la fuerza del motor después de salir de la teoría. Profundidad: {Math.min(8 + value, 18)} plys.</p>
                <div className="space-y-0.5 text-[10px]">
                  <p><span className="text-text font-medium">0–3:</span> Principiante — errores frecuentes</p>
                  <p><span className="text-text font-medium">4–8:</span> Intermedio — juego razonable</p>
                  <p><span className="text-text font-medium">9–14:</span> Avanzado — pocos errores</p>
                  <p><span className="text-text font-medium">15–18:</span> Experto — juego fuerte</p>
                  <p><span className="text-text font-medium">19–20:</span> Máximo — fuerza completa</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-surface border-r border-b border-surface-light rotate-45 -mt-1" />
              </div>
            )}
          </span>
        </h3>
        <span className="text-xs text-text-dim">{label} ({value})</span>
      </div>
      <input
        type="range"
        min={0}
        max={20}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1.5 bg-surface rounded-full appearance-none cursor-pointer accent-accent"
      />
    </div>
  )
}
