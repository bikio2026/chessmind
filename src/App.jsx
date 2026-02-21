import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useChessGame } from './hooks/useChessGame'
import { useStockfish } from './hooks/useStockfish'
import { usePositionAnalysis } from './hooks/usePositionAnalysis'
import { useSemanticAnalysis } from './hooks/useSemanticAnalysis'
import { buildAnalysisPrompt } from './lib/promptBuilder'
import { THEMES, DEFAULT_THEME } from './lib/pieceThemes.jsx'
import { Board } from './components/Board'
import { MoveList } from './components/MoveList'
import { EvalBar } from './components/EvalBar'
import { EnginePanel } from './components/EnginePanel'
import { SemanticPanel } from './components/SemanticPanel'
import { PgnLoader } from './components/PgnLoader'
import { PieceThemeSelector } from './components/PieceThemeSelector'
import { LLMSelector } from './components/LLMSelector'
import { RotateCcw, FlipVertical2, FileText, Brain } from 'lucide-react'

export default function App() {
  const {
    position,
    history,
    currentMoveIndex,
    turn,
    isGameOver,
    makeMove,
    goForward,
    goBack,
    goToMove,
    goToStart,
    goToEnd,
    loadPgn,
    reset,
  } = useChessGame()

  const { isReady: sfReady, isAnalyzing: sfAnalyzing, lines, analyze: sfAnalyze, engineLabel, loadingStatus: sfLoadingStatus } = useStockfish()
  const heuristics = usePositionAnalysis(position)
  const {
    narrative, isAnalyzing: llmAnalyzing, error: llmError,
    providerStatus, analyze: llmAnalyze, checkHealth, clearNarrative, startOllama,
  } = useSemanticAnalysis()

  const [orientation, setOrientation] = useState('white')
  const [pgnLoaderOpen, setPgnLoaderOpen] = useState(false)
  const [pieceTheme, setPieceTheme] = useState(() => {
    return localStorage.getItem('chessmind-theme') || DEFAULT_THEME
  })
  const [semanticEnabled, setSemanticEnabled] = useState(() => {
    return localStorage.getItem('chessmind-semantic') !== 'false'
  })
  const isProduction = typeof window !== 'undefined' && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')

  const [llmProvider, setLlmProvider] = useState(() => {
    const saved = localStorage.getItem('chessmind-llm-provider') || 'ollama'
    // In production, Ollama is not available — default to Groq
    if (isProduction && saved === 'ollama') return 'groq'
    return saved
  })
  const [llmModel, setLlmModel] = useState(() => {
    return localStorage.getItem('chessmind-llm-model') || ''
  })

  const lastMove = currentMoveIndex >= 0 ? history[currentMoveIndex] : null
  const currentScore = lines[0]?.score || null

  // Ref to access latest lines[0] without triggering effects
  const linesRef = useRef(null)
  linesRef.current = lines[0] || null

  // Is the selected provider available?
  const isProviderAvailable = providerStatus[llmProvider] ?? null

  const customPieces = useMemo(() => {
    const theme = THEMES[pieceTheme]
    return theme?.getPieces() || undefined
  }, [pieceTheme])

  const flipBoard = useCallback(() => {
    setOrientation(prev => prev === 'white' ? 'black' : 'white')
  }, [])

  function handleThemeChange(theme) {
    setPieceTheme(theme)
    localStorage.setItem('chessmind-theme', theme)
  }

  function handleToggleSemantic() {
    setSemanticEnabled(prev => {
      const next = !prev
      localStorage.setItem('chessmind-semantic', String(next))
      if (!next) clearNarrative()
      return next
    })
  }

  function handleLLMChange(provider, model) {
    setLlmProvider(provider)
    setLlmModel(model)
    localStorage.setItem('chessmind-llm-provider', provider)
    localStorage.setItem('chessmind-llm-model', model)
    clearNarrative()
  }

  // Don't auto-analyze the starting position (no moves played/loaded)
  const hasMoves = currentMoveIndex >= 0 || history.length > 0

  // Check provider availability on mount
  useEffect(() => {
    checkHealth()
  }, [checkHealth])

  // Auto-analyze with Stockfish when position changes
  useEffect(() => {
    if (sfReady && position) {
      sfAnalyze(position)
    }
  }, [position, sfReady, sfAnalyze])

  // Helper to build prompt and trigger LLM analysis
  const triggerSemanticAnalysis = useCallback((pos, forceCacheKey) => {
    if (!pos) return
    const h = heuristics
    if (!h) return

    // Full history up to current move (for opening identification)
    const fullHistory = currentMoveIndex >= 0
      ? history.slice(0, currentMoveIndex + 1)
      : []

    const prompt = buildAnalysisPrompt({
      fen: pos, turn, lastMove,
      evaluation: linesRef.current, heuristics: h, fullHistory,
    })

    llmAnalyze(prompt, forceCacheKey || pos, llmProvider, llmModel || undefined)
  }, [heuristics, currentMoveIndex, history, turn, lastMove, llmAnalyze, llmProvider, llmModel])

  // Auto-analyze with LLM when position changes (only if enabled + available + has moves)
  useEffect(() => {
    if (semanticEnabled && isProviderAvailable && heuristics && position && hasMoves) {
      triggerSemanticAnalysis(position)
    }
  }, [position, isProviderAvailable, heuristics, triggerSemanticAnalysis, semanticEnabled, hasMoves])

  // Re-trigger analysis when provider becomes available
  const prevAvailableRef = useRef(isProviderAvailable)
  useEffect(() => {
    const wasAvailable = prevAvailableRef.current
    prevAvailableRef.current = isProviderAvailable
    if (!wasAvailable && isProviderAvailable && semanticEnabled && heuristics && position && hasMoves) {
      triggerSemanticAnalysis(position)
    }
  }, [isProviderAvailable, heuristics, position, triggerSemanticAnalysis, semanticEnabled, hasMoves])

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return
      switch (e.key) {
        case 'ArrowLeft': e.preventDefault(); goBack(); break
        case 'ArrowRight': e.preventDefault(); goForward(); break
        case 'Home': e.preventDefault(); goToStart(); break
        case 'End': e.preventDefault(); goToEnd(); break
        case 'f': flipBoard(); break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goBack, goForward, goToStart, goToEnd, flipBoard])

  function handleRefreshSemantic() {
    if (!isProviderAvailable) {
      checkHealth()
    } else {
      clearNarrative()
      triggerSemanticAnalysis(position, position + '_refresh_' + Date.now())
    }
  }

  return (
    <div className="min-h-screen bg-surface p-3 md:p-4">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-3 flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-xl md:text-2xl font-bold text-accent">
          ChessMind
          <span className="text-xs md:text-sm font-normal text-text-dim ml-2">Análisis Semántico</span>
        </h1>
        <div className="flex items-center gap-2 md:gap-3">
          <PieceThemeSelector currentTheme={pieceTheme} onChange={handleThemeChange} />
          <LLMSelector
            provider={llmProvider}
            model={llmModel}
            providerStatus={providerStatus}
            enabled={semanticEnabled}
            isProduction={isProduction}
            onChange={handleLLMChange}
            onToggle={handleToggleSemantic}
          />
          <button
            onClick={() => setPgnLoaderOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-alt rounded-lg text-text-dim hover:text-text hover:bg-surface-light transition-colors text-sm"
          >
            <FileText size={16} />
            <span className="hidden sm:inline">Cargar PGN</span>
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">
        {/* Left: EvalBar + Board */}
        <div className="flex gap-2 shrink-0 self-center lg:self-start">
          <EvalBar score={currentScore} isGameOver={isGameOver} turn={turn} />
          <div className="flex flex-col items-center gap-3">
            <Board
              position={position}
              onMove={makeMove}
              orientation={orientation}
              lastMove={lastMove}
              pieces={customPieces}
            />

            {/* Controls */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <button onClick={goToStart} className="px-2.5 py-1.5 bg-surface-alt rounded text-text-dim hover:text-text hover:bg-surface-light transition-colors text-sm" title="Inicio (Home)">⏮</button>
              <button onClick={goBack} className="px-2.5 py-1.5 bg-surface-alt rounded text-text-dim hover:text-text hover:bg-surface-light transition-colors text-sm" title="Atrás (←)">◀</button>
              <button onClick={goForward} className="px-2.5 py-1.5 bg-surface-alt rounded text-text-dim hover:text-text hover:bg-surface-light transition-colors text-sm" title="Adelante (→)">▶</button>
              <button onClick={goToEnd} className="px-2.5 py-1.5 bg-surface-alt rounded text-text-dim hover:text-text hover:bg-surface-light transition-colors text-sm" title="Final (End)">⏭</button>
              <div className="w-px h-6 bg-surface-light mx-0.5" />
              <button onClick={flipBoard} className="p-1.5 bg-surface-alt rounded text-text-dim hover:text-text hover:bg-surface-light transition-colors" title="Girar tablero (F)">
                <FlipVertical2 size={18} />
              </button>
              <button onClick={reset} className="p-1.5 bg-surface-alt rounded text-text-dim hover:text-text hover:bg-surface-light transition-colors" title="Nueva partida">
                <RotateCcw size={18} />
              </button>
            </div>

            {/* Turn indicator */}
            <div className="flex items-center gap-2 text-sm text-text-dim">
              <span className={`w-3 h-3 rounded-full border border-surface-light ${turn === 'w' ? 'bg-eval-white' : 'bg-eval-black'}`} />
              Turno: <span className="font-medium text-text">{turn === 'w' ? 'Blancas' : 'Negras'}</span>
              {history.length > 0 && (
                <span className="text-text-muted text-xs ml-1">
                  ({Math.ceil(history.length / 2)} jugadas)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Panels */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <EnginePanel
            lines={lines}
            isAnalyzing={sfAnalyzing}
            isReady={sfReady}
            currentFen={position}
            isGameOver={isGameOver}
            turn={turn}
            engineLabel={engineLabel}
            loadingStatus={sfLoadingStatus}
          />

          <MoveList
            history={history}
            currentMoveIndex={currentMoveIndex}
            onMoveClick={goToMove}
          />

          <SemanticPanel
            narrative={narrative}
            isAnalyzing={llmAnalyzing}
            error={llmError}
            providerStatus={providerStatus}
            llmProvider={llmProvider}
            llmModel={llmModel}
            semanticEnabled={semanticEnabled}
            onRefresh={handleRefreshSemantic}
            onStartOllama={startOllama}
          />
        </div>
      </div>

      {/* FEN display */}
      <div className="max-w-7xl mx-auto mt-3">
        <div className="font-mono text-xs text-text-muted bg-surface-alt rounded px-3 py-1.5 break-all">
          {position}
        </div>
      </div>

      {/* PGN Loader Modal */}
      <PgnLoader
        isOpen={pgnLoaderOpen}
        onClose={() => setPgnLoaderOpen(false)}
        onLoad={loadPgn}
      />
    </div>
  )
}
