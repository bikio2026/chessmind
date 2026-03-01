import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { Chess } from 'chess.js'
import { uciToSan } from '../lib/stockfishParser'
import { buildHintPrompt, buildAttemptFeedbackPrompt } from '../lib/hintPromptBuilder'

/**
 * Guided Training — sequential "review game" mode for the Analyzer.
 *
 * The user loads a PGN, picks a side, and goes move-by-move.
 * Each position where it's their turn, they attempt the best move.
 * The hook evaluates, streams LLM feedback, records ✅/❌, and advances.
 *
 * Runs 100 % in parallel with the existing useTrainingMode hook
 * (new files only — nothing else modified).
 */
export function useGuidedTraining({
  position,
  history,
  currentMoveIndex,
  turn,
  isGameOver,
  evaluateMove,
  evaluatePosition,
  engineReady,
  llmProvider,
  llmModel,
  goToMove,
  heuristics,
}) {
  // ── Toggle ──
  const [isGuidedMode, setIsGuidedMode] = useState(false)

  // ── Config ──
  const [playerSide, setPlayerSide] = useState(() => {
    return localStorage.getItem('chessmind-guided-side') || 'w'
  })

  // ── Sequential phase: waiting | feedback | complete ──
  const [currentPhase, setCurrentPhase] = useState('waiting')

  // ── Attempt records keyed by moveIndex ──
  const [attempts, setAttempts] = useState(new Map())

  // ── Current attempt (while in 'feedback' phase) ──
  const [currentAttempt, setCurrentAttempt] = useState(null)
  const [isEvaluating, setIsEvaluating] = useState(false)

  // ── Feedback LLM ──
  const [feedbackText, setFeedbackText] = useState('')
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false)

  // ── Hints (progressive, like existing training) ──
  const [hintLevel, setHintLevel] = useState(0)
  const [hintText, setHintText] = useState('')
  const [isLoadingHint, setIsLoadingHint] = useState(false)

  // ── Abort refs ──
  const feedbackAbortRef = useRef(null)
  const hintAbortRef = useRef(null)

  // Track position for reset
  const positionRef = useRef(position)

  // ── Computed helpers ──
  const isPlayerTurn = useMemo(() => {
    if (playerSide === 'both') return true
    return turn === playerSide
  }, [turn, playerSide])

  const totalPlayerMoves = useMemo(() => {
    if (!history.length) return 0
    if (playerSide === 'both') return history.length
    return history.filter((_, i) => {
      // Even indices = white moves, odd = black
      return playerSide === 'w' ? i % 2 === 0 : i % 2 === 1
    }).length
  }, [history, playerSide])

  const attemptedCount = useMemo(() => attempts.size, [attempts])

  // ── Reference move (next move in the PGN) ──
  const referenceMoveSan = useMemo(() => {
    if (currentMoveIndex >= history.length - 1) return null
    return history[currentMoveIndex + 1]?.san || null
  }, [history, currentMoveIndex])

  const hasFutureMoves = history.length > 0 && currentMoveIndex < history.length - 1

  // ── Accuracy computation (ACPL-based) ──
  const sessionStats = useMemo(() => {
    if (attempts.size === 0) return { accuracy: 0, total: 0, correct: 0, classifications: {} }

    let totalCpLoss = 0
    let correct = 0
    const classifications = {}

    for (const [, record] of attempts) {
      totalCpLoss += record.scoreDiff || 0
      if (record.isCorrect) correct++
      const cls = record.classification || 'unknown'
      classifications[cls] = (classifications[cls] || 0) + 1
    }

    const avgCpLoss = attempts.size > 0 ? totalCpLoss / attempts.size : 0
    const accuracy = Math.max(0, Math.min(1, 1 - avgCpLoss / 100))

    return {
      accuracy: Math.round(accuracy * 100),
      total: attempts.size,
      correct,
      classifications,
      avgCpLoss: Math.round(avgCpLoss),
    }
  }, [attempts])

  // ── Board arrows ──
  const guidedArrows = useMemo(() => {
    if (!isGuidedMode) return []
    const arrows = []

    // Show hint arrow when fully revealed
    if (hintLevel === 2 && referenceMoveSan && position) {
      try {
        const game = new Chess(position)
        const move = game.move(referenceMoveSan)
        if (move) {
          arrows.push({
            startSquare: move.from,
            endSquare: move.to,
            color: 'rgba(40, 167, 69, 0.8)',
          })
        }
      } catch { /* ignore */ }
    }

    return arrows
  }, [isGuidedMode, hintLevel, referenceMoveSan, position])

  // ── Reset hints & feedback on position change ──
  useEffect(() => {
    if (position !== positionRef.current) {
      positionRef.current = position
      setHintLevel(0)
      setHintText('')
      setIsLoadingHint(false)
      if (currentPhase !== 'complete') {
        setCurrentPhase('waiting')
      }
      setCurrentAttempt(null)
      setFeedbackText('')
      setIsLoadingFeedback(false)
      if (feedbackAbortRef.current) feedbackAbortRef.current.abort()
      if (hintAbortRef.current) hintAbortRef.current.abort()
    }
  }, [position, currentPhase])

  // ── LLM streaming helper (same pattern as useTrainingMode) ──
  const streamLLM = useCallback(async (prompt, promptVersion, abortRef, onToken) => {
    let provider = llmProvider || 'claude'
    let model = llmModel || ''

    // Ollama not available in production
    if (provider === 'ollama') {
      provider = 'claude'
      model = 'claude-haiku-4-5-20251001'
    }
    if (provider === 'claude' && !model) model = 'claude-haiku-4-5-20251001'
    if (provider === 'groq' && !model) model = 'llama-3.3-70b-versatile'

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const endpoint = provider === 'groq' ? '/api/analyze-groq' : '/api/analyze-claude'

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model, promptVersion }),
      signal: controller.signal,
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData.error || `Error del servidor (${res.status})`)
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let fullText = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n').filter(l => l.startsWith('data: '))

      for (const line of lines) {
        try {
          const json = JSON.parse(line.slice(6))
          if (json.token) {
            fullText += json.token
            onToken(fullText)
          }
        } catch { /* skip malformed SSE */ }
      }
    }

    return fullText
  }, [llmProvider, llmModel])

  // ── Toggle guided mode ──
  const toggleGuidedMode = useCallback(() => {
    setIsGuidedMode(prev => {
      const next = !prev
      if (!next) {
        // Exiting: reset all state
        setCurrentPhase('waiting')
        setAttempts(new Map())
        setCurrentAttempt(null)
        setFeedbackText('')
        setHintLevel(0)
        setHintText('')
      }
      return next
    })
  }, [])

  // ── Change player side ──
  const handleSetPlayerSide = useCallback((side) => {
    setPlayerSide(side)
    localStorage.setItem('chessmind-guided-side', side)
    // Reset session when changing side
    setAttempts(new Map())
    setCurrentAttempt(null)
    setFeedbackText('')
    setHintLevel(0)
    setHintText('')
    setCurrentPhase('waiting')
  }, [])

  // ── Attempt a move ──
  const attemptMove = useCallback(async (from, to, promotion) => {
    if (!position || isGameOver || currentPhase !== 'waiting') return null
    if (!hasFutureMoves) return null // Need a PGN loaded

    // Validate move
    const tempGame = new Chess(position)
    const result = tempGame.move({ from, to, promotion: promotion || 'q' })
    if (!result) return null

    const playedSan = result.san
    const fenAfter = tempGame.fen()
    const isCorrect = referenceMoveSan && playedSan === referenceMoveSan

    setIsEvaluating(true)

    const attempt = {
      moveIndex: currentMoveIndex + 1,
      san: playedSan,
      from, to, promotion,
      isCorrect,
      bestMoveSan: referenceMoveSan,
      classification: null,
      scoreDiff: 0,
      feedbackText: '',
      feedbackRating: null,
      hintUsed: hintLevel > 0,
      timestamp: Date.now(),
    }

    if (isCorrect) {
      attempt.classification = 'excellent'
      attempt.scoreDiff = 0
    } else if (evaluateMove && engineReady) {
      try {
        const evaluation = await evaluateMove(position, fenAfter)
        if (evaluation) {
          attempt.classification = evaluation.classification
          attempt.scoreDiff = evaluation.scoreDiff
          if (!attempt.bestMoveSan && evaluation.bestMoveUci) {
            try {
              const game = new Chess(position)
              attempt.bestMoveSan = uciToSan(game, evaluation.bestMoveUci)
            } catch { /* ignore */ }
          }
        }
      } catch (err) {
        console.error('[GuidedTraining] Evaluation error:', err)
      }
    }

    setIsEvaluating(false)
    setCurrentAttempt(attempt)
    setCurrentPhase('feedback')

    // Store in attempts map
    setAttempts(prev => {
      const next = new Map(prev)
      next.set(attempt.moveIndex, attempt)
      return next
    })

    // Trigger LLM feedback
    setIsLoadingFeedback(true)
    setFeedbackText('')

    const fullHistory = currentMoveIndex >= 0
      ? history.slice(0, currentMoveIndex + 1)
      : []

    const prompt = buildAttemptFeedbackPrompt({
      fen: position,
      turn,
      playedMove: playedSan,
      bestMove: attempt.bestMoveSan || '?',
      classification: attempt.classification || 'good',
      cpLoss: attempt.scoreDiff,
      fullHistory,
    })

    try {
      const finalText = await streamLLM(prompt, 'trainer', feedbackAbortRef, (text) => {
        setFeedbackText(text)
      })
      // Save feedback text to the attempt record
      attempt.feedbackText = finalText
      setAttempts(prev => {
        const next = new Map(prev)
        next.set(attempt.moveIndex, { ...attempt })
        return next
      })
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('[GuidedTraining] Feedback error:', err.message)
        setFeedbackText('No se pudo generar feedback.')
      }
    } finally {
      setIsLoadingFeedback(false)
    }

    return attempt
  }, [position, isGameOver, currentPhase, hasFutureMoves, referenceMoveSan,
    currentMoveIndex, hintLevel, evaluateMove, engineReady, history, turn, streamLLM])

  // ── Rate feedback ──
  const rateFeedback = useCallback((rating) => {
    if (!currentAttempt) return
    const updated = { ...currentAttempt, feedbackRating: rating }
    setCurrentAttempt(updated)
    setAttempts(prev => {
      const next = new Map(prev)
      next.set(updated.moveIndex, updated)
      return next
    })
  }, [currentAttempt])

  // ── Continue to next position ──
  const continueTraining = useCallback(() => {
    setCurrentAttempt(null)
    setFeedbackText('')
    setHintLevel(0)
    setHintText('')
    setCurrentPhase('waiting')

    if (!hasFutureMoves) {
      setCurrentPhase('complete')
      return
    }

    // Advance to the next move in the PGN
    const nextIndex = currentMoveIndex + 1
    goToMove(nextIndex)

    // Check if we need to auto-advance past opponent moves
    // This is handled by the auto-advance effect below
  }, [hasFutureMoves, currentMoveIndex, goToMove])

  // ── Auto-advance past opponent moves ──
  useEffect(() => {
    if (!isGuidedMode || currentPhase !== 'waiting' || !hasFutureMoves) return
    if (playerSide === 'both') return // User plays both sides

    // Check if current position is opponent's turn
    const isOpponentTurn = turn !== playerSide
    if (!isOpponentTurn) return

    // Auto-advance after a short delay (so user sees the board update)
    const timer = setTimeout(() => {
      const nextIndex = currentMoveIndex + 1
      if (nextIndex < history.length) {
        goToMove(nextIndex)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [isGuidedMode, currentPhase, hasFutureMoves, playerSide, turn, currentMoveIndex, history.length, goToMove])

  // ── Detect end of game ──
  useEffect(() => {
    if (!isGuidedMode || currentPhase === 'complete' || currentPhase === 'feedback') return
    if (!hasFutureMoves && attempts.size > 0) {
      setCurrentPhase('complete')
    }
  }, [isGuidedMode, currentPhase, hasFutureMoves, attempts.size])

  // ── Request hint ──
  const requestHint = useCallback(async () => {
    if (isGameOver || currentPhase !== 'waiting') return
    if (!referenceMoveSan) return

    if (hintLevel === 0) {
      setHintLevel(1)
      setIsLoadingHint(true)

      const fullHistory = currentMoveIndex >= 0
        ? history.slice(0, currentMoveIndex + 1)
        : []

      const prompt = buildHintPrompt({
        fen: position,
        turn,
        heuristics,
        bestMoveSan: referenceMoveSan,
        fullHistory,
      })

      try {
        await streamLLM(prompt, 'hint', hintAbortRef, (text) => {
          setHintText(text)
        })
      } catch (err) {
        if (err.name !== 'AbortError') {
          setHintText('No se pudo generar la pista.')
        }
      } finally {
        setIsLoadingHint(false)
      }
      return
    }

    if (hintLevel === 1) {
      setHintLevel(2)
    }
  }, [hintLevel, referenceMoveSan, position, turn, heuristics, history, currentMoveIndex, isGameOver, currentPhase, streamLLM])

  // ── Finish session ──
  const finishSession = useCallback(() => {
    setCurrentPhase('complete')
  }, [])

  // ── Reset session ──
  const resetSession = useCallback(() => {
    setAttempts(new Map())
    setCurrentAttempt(null)
    setFeedbackText('')
    setHintLevel(0)
    setHintText('')
    setCurrentPhase('waiting')
  }, [])

  return {
    // Toggle
    isGuidedMode,
    toggleGuidedMode,

    // Config
    playerSide,
    setPlayerSide: handleSetPlayerSide,

    // Phase
    currentPhase,

    // Attempts map
    attempts,
    currentAttempt,
    isEvaluating,

    // Feedback
    feedbackText,
    isLoadingFeedback,
    rateFeedback,

    // Hints
    hintLevel,
    hintText,
    isLoadingHint,
    requestHint,
    referenceMoveSan,

    // Arrows
    guidedArrows,

    // Actions
    attemptMove,
    continueTraining,
    finishSession,
    resetSession,

    // Stats
    sessionStats,
    totalPlayerMoves,
    attemptedCount,
    hasFutureMoves,

    // Helpers for UI
    isPlayerTurn,
    hideFutureMoves: true, // Always hide in guided mode
  }
}
