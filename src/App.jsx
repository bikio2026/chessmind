import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useChessGame } from './hooks/useChessGame'
import { useStockfish } from './hooks/useStockfish'
import { usePositionAnalysis } from './hooks/usePositionAnalysis'
import { useSemanticAnalysis } from './hooks/useSemanticAnalysis'
import { useBoardEditor } from './hooks/useBoardEditor'
import { buildAnalysisPrompt } from './lib/promptBuilder'
import { PROMPT_VERSIONS, DEFAULT_VERSION } from './lib/promptVersions'
import { pvToSan } from './lib/stockfishParser'
import { Chess } from 'chess.js'
import { THEMES, DEFAULT_THEME } from './lib/pieceThemes.jsx'
import { Board } from './components/Board'
import { MoveList } from './components/MoveList'
import { EvalBar } from './components/EvalBar'
import { EnginePanel } from './components/EnginePanel'
import { SemanticPanel } from './components/SemanticPanel'
import { PgnLoader } from './components/PgnLoader'
import { PieceThemeSelector } from './components/PieceThemeSelector'
import { LLMSelector } from './components/LLMSelector'
import { PiecePalette } from './components/PiecePalette'
import { EditorControls } from './components/EditorControls'
import { TrainerView } from './components/trainer/TrainerView'
import { RotateCcw, FlipVertical2, FileText, PenLine, GraduationCap, BarChart3 } from 'lucide-react'

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('chessmind-tab') || 'analyzer'
  })

  const editor = useBoardEditor()

  function handleTabChange(tab) {
    // Exit edit mode when switching tabs
    if (editor.isEditMode) editor.exitEditMode()
    setActiveTab(tab)
    localStorage.setItem('chessmind-tab', tab)
  }

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
    pgnHeaders,
    loadPgn,
    loadFen,
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
  const [promptVersion, setPromptVersion] = useState(() => {
    return localStorage.getItem('chessmind-prompt-version') || DEFAULT_VERSION
  })

  const lastMove = currentMoveIndex >= 0 ? history[currentMoveIndex] : null
  const currentScore = lines[0]?.score || null

  // Ref to access latest Stockfish lines without triggering effects
  const linesRef = useRef([])
  linesRef.current = lines || []

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

  function handlePromptVersionChange(version) {
    setPromptVersion(version)
    localStorage.setItem('chessmind-prompt-version', version)
    clearNarrative()
  }

  // Don't auto-analyze the starting position (no moves played/loaded)
  const hasMoves = currentMoveIndex >= 0 || history.length > 0

  // Check provider availability on mount
  useEffect(() => {
    checkHealth()
  }, [checkHealth])

  // Auto-analyze with Stockfish when position changes (skip in edit mode)
  useEffect(() => {
    if (sfReady && position && !editor.isEditMode) {
      sfAnalyze(position)
    }
  }, [position, sfReady, sfAnalyze, editor.isEditMode])

  // Helper to build prompt and trigger LLM analysis
  const triggerSemanticAnalysis = useCallback((pos, forceCacheKey) => {
    if (!pos) return
    const h = heuristics
    if (!h) return

    // Full history up to current move (for opening identification)
    const fullHistory = currentMoveIndex >= 0
      ? history.slice(0, currentMoveIndex + 1)
      : []

    // Convert Stockfish PV lines to SAN for the LLM
    const sfLines = linesRef.current.map(line => ({
      ...line,
      pvSan: line.pv?.length ? pvToSan(Chess, pos, line.pv, 6) : [],
    }))

    const prompt = buildAnalysisPrompt({
      fen: pos, turn, lastMove,
      lines: sfLines, heuristics: h, fullHistory,
    })

    llmAnalyze(prompt, forceCacheKey || pos, llmProvider, llmModel || undefined, promptVersion)
  }, [heuristics, currentMoveIndex, history, turn, lastMove, llmAnalyze, llmProvider, llmModel, promptVersion])

  // Auto-analyze with LLM when position changes (skip in edit mode)
  useEffect(() => {
    if (semanticEnabled && isProviderAvailable && heuristics && position && hasMoves && !editor.isEditMode) {
      triggerSemanticAnalysis(position)
    }
  }, [position, isProviderAvailable, heuristics, triggerSemanticAnalysis, semanticEnabled, hasMoves, editor.isEditMode])

  // Re-trigger analysis when provider becomes available
  const prevAvailableRef = useRef(isProviderAvailable)
  useEffect(() => {
    const wasAvailable = prevAvailableRef.current
    prevAvailableRef.current = isProviderAvailable
    if (!wasAvailable && isProviderAvailable && semanticEnabled && heuristics && position && hasMoves && !editor.isEditMode) {
      triggerSemanticAnalysis(position)
    }
  }, [isProviderAvailable, heuristics, position, triggerSemanticAnalysis, semanticEnabled, hasMoves, editor.isEditMode])

  // Keyboard navigation (disable in edit mode)
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return

      // Edit mode: only Escape to exit
      if (editor.isEditMode) {
        if (e.key === 'Escape') {
          e.preventDefault()
          editor.exitEditMode()
        }
        return
      }

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
  }, [goBack, goForward, goToStart, goToEnd, flipBoard, editor.isEditMode, editor.exitEditMode])

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
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold text-accent">
            ChessMind
          </h1>
          {/* Tab switcher */}
          <div className="flex bg-surface-alt rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => handleTabChange('analyzer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'analyzer'
                  ? 'bg-accent/20 text-accent'
                  : 'text-text-dim hover:text-text hover:bg-surface-light/50'
              }`}
            >
              <BarChart3 size={13} />
              <span className="hidden sm:inline">Analizador</span>
            </button>
            <button
              onClick={() => handleTabChange('trainer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'trainer'
                  ? 'bg-accent/20 text-accent'
                  : 'text-text-dim hover:text-text hover:bg-surface-light/50'
              }`}
            >
              <GraduationCap size={13} />
              <span className="hidden sm:inline">Entrenador</span>
            </button>
          </div>
        </div>
        {/* Analyzer controls (only show in analyzer tab, hide in edit mode) */}
        {activeTab === 'analyzer' && !editor.isEditMode && (
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
        )}
        {/* Edit mode indicator in header */}
        {activeTab === 'analyzer' && editor.isEditMode && (
          <div className="flex items-center gap-2 text-sm text-accent">
            <PenLine size={16} />
            <span className="font-medium">Modo editor</span>
            <span className="text-text-muted text-xs">(Esc para cancelar)</span>
          </div>
        )}
      </header>

      {/* Tab Content */}
      {activeTab === 'analyzer' ? (
        <>
          {/* Main layout */}
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">
            {/* Left: EvalBar + Board + Controls */}
            <div className="flex flex-col items-center gap-3 shrink-0 self-center lg:self-start">
              {/* Piece palette (edit mode only) */}
              {editor.isEditMode && (
                <PiecePalette
                  selectedPiece={editor.selectedPiece}
                  onSelect={editor.selectPalettePiece}
                  customPieces={customPieces}
                />
              )}

              {/* Player label (top — opponent side) */}
              {!editor.isEditMode && pgnHeaders?.White && (
                <div className="flex items-center gap-2 text-xs text-text-dim self-start ml-7">
                  <span className={`w-2.5 h-2.5 rounded-full border ${orientation === 'white' ? 'bg-eval-black border-text-muted/50' : 'bg-eval-white border-text-muted/30'}`} />
                  <span className="font-medium text-text">
                    {orientation === 'white' ? pgnHeaders.Black : pgnHeaders.White}
                  </span>
                  {pgnHeaders.BlackElo && orientation === 'white' && (
                    <span className="text-text-muted">({pgnHeaders.BlackElo})</span>
                  )}
                  {pgnHeaders.WhiteElo && orientation === 'black' && (
                    <span className="text-text-muted">({pgnHeaders.WhiteElo})</span>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                {!editor.isEditMode && (
                  <EvalBar score={currentScore} isGameOver={isGameOver} turn={turn} />
                )}
                <Board
                  position={editor.isEditMode ? editor.editorFen : position}
                  onMove={editor.isEditMode ? null : makeMove}
                  orientation={orientation}
                  lastMove={editor.isEditMode ? null : lastMove}
                  pieces={customPieces}
                  editMode={editor.isEditMode}
                  onEditPlace={editor.placePiece}
                  onEditRemove={editor.removePiece}
                />
              </div>

              {/* Player label (bottom — our side) */}
              {!editor.isEditMode && pgnHeaders?.White && (
                <div className="flex items-center gap-2 text-xs text-text-dim self-start ml-7">
                  <span className={`w-2.5 h-2.5 rounded-full border ${orientation === 'white' ? 'bg-eval-white border-text-muted/30' : 'bg-eval-black border-text-muted/50'}`} />
                  <span className="font-medium text-text">
                    {orientation === 'white' ? pgnHeaders.White : pgnHeaders.Black}
                  </span>
                  {pgnHeaders.WhiteElo && orientation === 'white' && (
                    <span className="text-text-muted">({pgnHeaders.WhiteElo})</span>
                  )}
                  {pgnHeaders.BlackElo && orientation === 'black' && (
                    <span className="text-text-muted">({pgnHeaders.BlackElo})</span>
                  )}
                </div>
              )}

              {/* Controls: edit mode vs normal mode */}
              {editor.isEditMode ? (
                <EditorControls
                  turn={editor.editorTurn}
                  onTurnChange={editor.setEditorTurn}
                  castling={editor.castlingRights}
                  onCastlingChange={editor.toggleCastlingRight}
                  onClear={editor.clearBoard}
                  onReset={editor.resetBoard}
                  onAnalyze={() => editor.validateAndApply(loadFen)}
                  onCancel={editor.exitEditMode}
                  validationError={editor.validationError}
                />
              ) : (
                <>
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
                    <button onClick={editor.enterEditMode} className="p-1.5 bg-surface-alt rounded text-text-dim hover:text-text hover:bg-surface-light transition-colors" title="Editar posición">
                      <PenLine size={18} />
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
                </>
              )}
            </div>

            {/* Right: Panels */}
            <div className="flex-1 flex flex-col gap-3 min-w-0">
              {editor.isEditMode ? (
                /* Edit mode placeholder */
                <div className="bg-surface-alt rounded-xl p-6 text-center">
                  <PenLine size={24} className="mx-auto mb-3 text-accent" />
                  <p className="text-text font-medium mb-1">Modo editor activo</p>
                  <p className="text-text-muted text-sm mb-4">
                    Armá la posición que quieras analizar.
                  </p>
                  <div className="text-text-dim text-xs space-y-1">
                    <p><strong>Click izquierdo:</strong> coloca la pieza seleccionada</p>
                    <p><strong>Click derecho:</strong> borra la pieza</p>
                    <p><strong>Arrastrar:</strong> mueve piezas libremente</p>
                    <p><strong>FEN:</strong> editá el campo de texto debajo del tablero</p>
                  </div>
                </div>
              ) : (
                /* Normal analyzer panels */
                <>
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
                    promptVersion={promptVersion}
                    promptVersions={PROMPT_VERSIONS}
                    onPromptVersionChange={handlePromptVersionChange}
                  />
                </>
              )}
            </div>
          </div>

          {/* FEN display / editor */}
          <div className="max-w-7xl mx-auto mt-3">
            {editor.isEditMode ? (
              <input
                type="text"
                value={editor.editorFen}
                onChange={(e) => editor.updateFenFromInput(e.target.value)}
                className="w-full font-mono text-xs text-text bg-surface-alt rounded px-3 py-1.5 border border-surface-light focus:border-accent focus:outline-none"
                placeholder="Pegá un FEN acá..."
                spellCheck={false}
              />
            ) : (
              <div className="font-mono text-xs text-text-muted bg-surface-alt rounded px-3 py-1.5 break-all">
                {position}
              </div>
            )}
          </div>

          {/* PGN Loader Modal */}
          {!editor.isEditMode && (
            <PgnLoader
              isOpen={pgnLoaderOpen}
              onClose={() => setPgnLoaderOpen(false)}
              onLoad={loadPgn}
            />
          )}
        </>
      ) : (
        <TrainerView />
      )}
    </div>
  )
}
