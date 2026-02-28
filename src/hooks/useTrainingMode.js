import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { Chess } from 'chess.js'
import { uciToSan } from '../lib/stockfishParser'
import { buildHintPrompt, buildAttemptFeedbackPrompt, buildThreatPrompt } from '../lib/hintPromptBuilder'

/**
 * Create a null-move FEN: same position but opponent's turn.
 * Used for threat analysis (what would the opponent do?).
 */
function createNullMoveFen(fen) {
  const parts = fen.split(' ')
  parts[1] = parts[1] === 'w' ? 'b' : 'w'
  parts[3] = '-' // clear en passant (not valid after null move)
  return parts.join(' ')
}

/**
 * Convert a UCI move string to arrow format for react-chessboard.
 */
function uciToArrow(uci, color) {
  return {
    startSquare: uci.slice(0, 2),
    endSquare: uci.slice(2, 4),
    color,
  }
}

/**
 * Training Mode hook for the Analyzer.
 * Manages: toggle, progressive hints (LLM), move evaluation, reference mode,
 * threat visualization (null-move analysis + LLM), and board arrows.
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
 * @param {Function} params.evaluatePosition - From useTrainerEngine (fen) => Promise<{score, bestMoveUci}>
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
  evaluatePosition,
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

  // ── Threats ──
  const [showThreats, setShowThreats] = useState(false)
  const [threatMoveUci, setThreatMoveUci] = useState(null)
  const [threatMoveSan, setThreatMoveSan] = useState(null)
  const [threatText, setThreatText] = useState('')
  const [isLoadingThreats, setIsLoadingThreats] = useState(false)

  // ── Move attempt ──
  const [moveAttempt, setMoveAttempt] = useState(null)
  // { san, classification, scoreDiff, bestMoveSan, isCorrect, from, to, promotion }

  // ── Attempt feedback LLM ──
  const [feedbackText, setFeedbackText] = useState('')
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false)

  // Abort controllers
  const hintAbortRef = useRef(null)
  const feedbackAbortRef = useRef(null)
  const threatAbortRef = useRef(null)

  // Track position to detect changes
  const positionRef = useRef(position)

  // ── Computed: reference move ──
  const hasGameMove = history.length > 0 && currentMoveIndex < history.length - 1
  const hasFutureMoves = hasGameMove
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

  // ── Arrows: combine best move + threats ──
  const trainingArrows = useMemo(() => {
    if (!isTrainingMode) return []
    const arrows = []

    // Best move arrow: show when hint is fully revealed (level 2)
    if (hintLevel === 2 && bestMove) {
      arrows.push(uciToArrow(bestMove, 'rgba(40, 167, 69, 0.8)'))
    }

    // Threat arrow: show when threats toggle is on
    if (showThreats && threatMoveUci) {
      arrows.push(uciToArrow(threatMoveUci, 'rgba(220, 53, 69, 0.8)'))
    }

    return arrows
  }, [isTrainingMode, hintLevel, bestMove, showThreats, threatMoveUci])

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
      // Reset threats on position change
      setShowThreats(false)
      setThreatMoveUci(null)
      setThreatMoveSan(null)
      setThreatText('')
      setIsLoadingThreats(false)
      if (hintAbortRef.current) hintAbortRef.current.abort()
      if (feedbackAbortRef.current) feedbackAbortRef.current.abort()
      if (threatAbortRef.current) threatAbortRef.current.abort()
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
        setShowThreats(false)
        setThreatMoveUci(null)
        setThreatMoveSan(null)
        setThreatText('')
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

  // ── Toggle threats ──
  const toggleThreats = useCallback(async () => {
    if (showThreats) {
      // Turn off threats
      setShowThreats(false)
      setThreatMoveUci(null)
      setThreatMoveSan(null)
      setThreatText('')
      if (threatAbortRef.current) threatAbortRef.current.abort()
      return
    }

    if (!position || !engineReady || !evaluatePosition || isGameOver) return

    setShowThreats(true)
    setIsLoadingThreats(true)
    setThreatText('')
    setThreatMoveSan(null)
    setThreatMoveUci(null)

    try {
      // Null-move analysis: flip turn and find opponent's best move
      const nullFen = createNullMoveFen(position)
      const result = await evaluatePosition(nullFen)

      if (!result?.bestMoveUci) {
        setThreatText('No se detectaron amenazas claras.')
        setIsLoadingThreats(false)
        return
      }

      const threatUci = result.bestMoveUci
      setThreatMoveUci(threatUci)

      // Convert to SAN for display
      let threatSan = threatUci
      try {
        const game = new Chess(nullFen)
        threatSan = uciToSan(game, threatUci)
      } catch { /* keep UCI if conversion fails */ }
      setThreatMoveSan(threatSan)

      // Request LLM to explain the threat
      const opponentColor = turn === 'w' ? 'Negras' : 'Blancas'
      const fullHistory = currentMoveIndex >= 0
        ? history.slice(0, currentMoveIndex + 1)
        : []

      const prompt = buildThreatPrompt({
        fen: position,
        turn,
        threatMoveSan: threatSan,
        opponentColor,
        fullHistory,
        heuristics,
      })

      await streamLLM(prompt, 'threat', threatAbortRef, (text) => {
        setThreatText(text)
      })
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('[TrainingMode] Threat analysis error:', err.message)
        setThreatText('No se pudo analizar las amenazas.')
      }
    } finally {
      setIsLoadingThreats(false)
    }
  }, [showThreats, position, turn, engineReady, evaluatePosition, isGameOver, history, currentMoveIndex, streamLLM])

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
    hasFutureMoves,

    // Hints
    hintLevel,
    hintText,
    isLoadingHint,
    requestHint,
    bestMoveSan,

    // Threats
    showThreats,
    threatMoveSan,
    threatText,
    isLoadingThreats,
    toggleThreats,

    // Arrows (for Board)
    trainingArrows,

    // Move attempt
    moveAttempt,
    feedbackText,
    isLoadingFeedback,
    attemptMove,
    clearAttempt,
  }
}
