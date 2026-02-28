import { useState, useRef, useCallback, useEffect } from 'react'
import { Chess } from 'chess.js'
import { uciToSan } from '../lib/stockfishParser'
import { buildHintPrompt, buildAttemptFeedbackPrompt } from '../lib/hintPromptBuilder'

/**
 * Training Mode hook for the Analyzer.
 * Manages: toggle, progressive hints (LLM), move evaluation, reference mode.
 *
 * @param {Object} params
 * @param {string} params.bestMove - UCI best move from useStockfish (e.g. "e2e4")
 * @param {string} params.position - Current FEN
 * @param {string} params.turn - 'w' or 'b'
 * @param {Object} params.heuristics - From usePositionAnalysis
 * @param {Array}  params.history - Full move history from useChessGame
 * @param {number} params.currentMoveIndex - Current position in history
 * @param {boolean} params.isGameOver - Whether the game is over
 * @param {Function} params.evaluateMove - From useTrainerEngine (fenBefore, fenAfter) => Promise
 * @param {boolean} params.engineReady - Whether the trainer engine is ready
 */
export function useTrainingMode({
  bestMove,
  position,
  turn,
  heuristics,
  history,
  currentMoveIndex,
  isGameOver,
  evaluateMove,
  engineReady,
}) {
  // ── Toggle ──
  const [isTrainingMode, setIsTrainingMode] = useState(() => {
    return localStorage.getItem('chessmind-training-mode') === 'true'
  })

  // ── Reference mode: 'engine' (Stockfish best) or 'game' (historical move) ──
  const [referenceMode, setReferenceMode] = useState(() => {
    return localStorage.getItem('chessmind-training-reference') || 'engine'
  })

  // ── Hide future moves in MoveList ──
  const [hideFutureMoves, setHideFutureMoves] = useState(() => {
    return localStorage.getItem('chessmind-training-hidemoves') !== 'false'
  })

  // ── Hints ──
  const [hintLevel, setHintLevel] = useState(0) // 0=none, 1=conceptual, 2=revealed
  const [hintText, setHintText] = useState('')
  const [isLoadingHint, setIsLoadingHint] = useState(false)

  // ── Move attempt ──
  const [moveAttempt, setMoveAttempt] = useState(null)
  // { san, classification, scoreDiff, bestMoveSan, isCorrect, from, to, promotion }

  // ── Attempt feedback LLM ──
  const [feedbackText, setFeedbackText] = useState('')
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false)

  // Abort controllers
  const hintAbortRef = useRef(null)
  const feedbackAbortRef = useRef(null)

  // Track position to detect changes
  const positionRef = useRef(position)

  // ── Computed: reference move ──
  const hasGameMove = history.length > 0 && currentMoveIndex < history.length - 1
  const gameMoveSan = hasGameMove ? history[currentMoveIndex + 1]?.san : null

  const bestMoveSan = (() => {
    if (!bestMove || !position) return null
    try {
      const game = new Chess(position)
      return uciToSan(game, bestMove)
    } catch {
      return null
    }
  })()

  const referenceMoveSan = referenceMode === 'game' && gameMoveSan
    ? gameMoveSan
    : bestMoveSan

  // ── Reset on position change ──
  useEffect(() => {
    if (position !== positionRef.current) {
      positionRef.current = position
      setHintLevel(0)
      setHintText('')
      setMoveAttempt(null)
      setFeedbackText('')
      setIsLoadingHint(false)
      setIsLoadingFeedback(false)
      if (hintAbortRef.current) hintAbortRef.current.abort()
      if (feedbackAbortRef.current) feedbackAbortRef.current.abort()
    }
  }, [position])

  // ── Toggle handlers ──
  const toggleTrainingMode = useCallback(() => {
    setIsTrainingMode(prev => {
      const next = !prev
      localStorage.setItem('chessmind-training-mode', String(next))
      if (!next) {
        // Leaving training mode — reset state
        setHintLevel(0)
        setHintText('')
        setMoveAttempt(null)
        setFeedbackText('')
      }
      return next
    })
  }, [])

  const toggleReferenceMode = useCallback(() => {
    setReferenceMode(prev => {
      const next = prev === 'engine' ? 'game' : 'engine'
      localStorage.setItem('chessmind-training-reference', next)
      // Reset hints when switching reference
      setHintLevel(0)
      setHintText('')
      return next
    })
  }, [])

  const toggleHideFutureMoves = useCallback(() => {
    setHideFutureMoves(prev => {
      const next = !prev
      localStorage.setItem('chessmind-training-hidemoves', String(next))
      return next
    })
  }, [])

  // ── LLM streaming helper ──
  const streamLLM = useCallback(async (prompt, promptVersion, abortRef, onToken) => {
    let provider = localStorage.getItem('chessmind-llm-provider') || 'claude'
    let model = localStorage.getItem('chessmind-llm-model') || ''

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
        } catch { /* skip malformed SSE lines */ }
      }
    }

    return fullText
  }, [])

  // ── Request hint ──
  const requestHint = useCallback(async () => {
    if (isGameOver) return

    // Level 0 → 1: generate conceptual hint via LLM
    if (hintLevel === 0) {
      if (!referenceMoveSan) return // No best move available yet

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
          console.error('[TrainingMode] Hint error:', err.message)
          // If LLM fails, still show that we tried
          setHintText('No se pudo generar la pista. Probá revelar la jugada directamente.')
        }
      } finally {
        setIsLoadingHint(false)
      }
      return
    }

    // Level 1 → 2: reveal the move
    if (hintLevel === 1) {
      setHintLevel(2)
    }
  }, [hintLevel, referenceMoveSan, position, turn, heuristics, history, currentMoveIndex, isGameOver, streamLLM])

  // ── Attempt a move ──
  const attemptMove = useCallback(async (from, to, promotion) => {
    if (!position || isGameOver) return null

    // Validate the move on a temporary chess instance
    const tempGame = new Chess(position)
    const result = tempGame.move({ from, to, promotion: promotion || 'q' })
    if (!result) return null // Illegal move

    const playedSan = result.san
    const fenAfter = tempGame.fen()

    // Check if it matches the reference move
    const isCorrect = referenceMoveSan && playedSan === referenceMoveSan

    // Build the attempt object
    const attempt = {
      san: playedSan,
      from,
      to,
      promotion,
      isCorrect,
      bestMoveSan: referenceMoveSan,
      classification: null,
      scoreDiff: 0,
    }

    if (isCorrect) {
      attempt.classification = 'excellent'
      attempt.scoreDiff = 0
    } else if (evaluateMove && engineReady) {
      // Evaluate the move using trainer engine
      try {
        const evaluation = await evaluateMove(position, fenAfter)
        if (evaluation) {
          attempt.classification = evaluation.classification
          attempt.scoreDiff = evaluation.scoreDiff
          // If the engine's best move is different from our reference, use it for display
          if (!attempt.bestMoveSan && evaluation.bestMoveUci) {
            try {
              const game = new Chess(position)
              attempt.bestMoveSan = uciToSan(game, evaluation.bestMoveUci)
            } catch { /* ignore */ }
          }
        }
      } catch (err) {
        console.error('[TrainingMode] Evaluation error:', err)
      }
    }

    setMoveAttempt(attempt)

    // Trigger LLM feedback if the move wasn't the best and we have classification
    if (!isCorrect && attempt.classification) {
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
        classification: attempt.classification,
        cpLoss: attempt.scoreDiff,
        fullHistory,
      })

      try {
        await streamLLM(prompt, 'trainer', feedbackAbortRef, (text) => {
          setFeedbackText(text)
        })
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('[TrainingMode] Feedback error:', err.message)
        }
      } finally {
        setIsLoadingFeedback(false)
      }
    } else if (isCorrect || attempt.classification === 'excellent' || attempt.classification === 'good') {
      // Good move — still get a brief positive feedback
      setIsLoadingFeedback(true)
      setFeedbackText('')

      const fullHistory = currentMoveIndex >= 0
        ? history.slice(0, currentMoveIndex + 1)
        : []

      const prompt = buildAttemptFeedbackPrompt({
        fen: position,
        turn,
        playedMove: playedSan,
        bestMove: attempt.bestMoveSan || playedSan,
        classification: attempt.classification || 'excellent',
        cpLoss: attempt.scoreDiff,
        fullHistory,
      })

      try {
        await streamLLM(prompt, 'trainer', feedbackAbortRef, (text) => {
          setFeedbackText(text)
        })
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('[TrainingMode] Feedback error:', err.message)
        }
      } finally {
        setIsLoadingFeedback(false)
      }
    }

    return attempt
  }, [position, turn, isGameOver, referenceMoveSan, evaluateMove, engineReady, history, currentMoveIndex, streamLLM])

  // ── Clear attempt ──
  const clearAttempt = useCallback(() => {
    setMoveAttempt(null)
    setFeedbackText('')
    if (feedbackAbortRef.current) feedbackAbortRef.current.abort()
  }, [])

  return {
    // Toggle
    isTrainingMode,
    toggleTrainingMode,

    // Reference
    referenceMode,
    toggleReferenceMode,
    hasGameMove,
    referenceMoveSan,

    // Hide future moves
    hideFutureMoves,
    toggleHideFutureMoves,

    // Hints
    hintLevel,
    hintText,
    isLoadingHint,
    requestHint,
    bestMoveSan,

    // Move attempt
    moveAttempt,
    feedbackText,
    isLoadingFeedback,
    attemptMove,
    clearAttempt,
  }
}
