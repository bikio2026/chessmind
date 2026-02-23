import { useState, useRef, useCallback, useEffect } from 'react'
import { Chess } from 'chess.js'
import { getOpeningById } from '../data/openings'

/**
 * Core hook for the Opening Trainer.
 * Manages game state, theory tracking, move evaluation, and engine responses.
 */
export function useOpeningTrainer({ trainerEngine }) {
  const [phase, setPhase] = useState('select') // 'select' | 'playing' | 'summary'
  const [opening, setOpening] = useState(null)
  const [playerColor, setPlayerColor] = useState('white')
  const [position, setPosition] = useState('start')
  const [history, setHistory] = useState([])
  const [turn, setTurn] = useState('w')
  const [isGameOver, setIsGameOver] = useState(false)
  const [lastMove, setLastMove] = useState(null)
  const [theoryMoveIndex, setTheoryMoveIndex] = useState(-1) // last move index that was in theory
  const [isInTheory, setIsInTheory] = useState(true)
  const [deviationInfo, setDeviationInfo] = useState(null)
  const [moveEvaluations, setMoveEvaluations] = useState(new Map())
  const [engineStrength, setEngineStrength] = useState(() => {
    const saved = parseInt(localStorage.getItem('chessmind-trainer-strength') || '10')
    return isNaN(saved) ? 10 : saved
  })
  const [isEngineThinking, setIsEngineThinking] = useState(false)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [pendingFeedback, setPendingFeedback] = useState(null)
  const [sessionSummary, setSessionSummary] = useState(null)

  const gameRef = useRef(new Chess())
  const openingRef = useRef(null)
  const theoryIndexRef = useRef(0) // tracks position in mainLine array

  function sync() {
    const game = gameRef.current
    setPosition(game.fen())
    setTurn(game.turn())
    setIsGameOver(game.isGameOver())
    const h = game.history({ verbose: true })
    setHistory(h)
    if (h.length > 0) {
      const last = h[h.length - 1]
      setLastMove({ from: last.from, to: last.to, san: last.san })
    } else {
      setLastMove(null)
    }
  }

  // Persist engine strength
  useEffect(() => {
    localStorage.setItem('chessmind-trainer-strength', String(engineStrength))
  }, [engineStrength])

  /**
   * Start a new training session with a specific opening.
   */
  const startSession = useCallback((openingId) => {
    const op = typeof openingId === 'string' ? getOpeningById(openingId) : openingId
    if (!op) return

    openingRef.current = op
    theoryIndexRef.current = 0

    const game = new Chess()
    gameRef.current = game

    setOpening(op)
    setPlayerColor(op.color)
    setPhase('playing')
    setIsInTheory(true)
    setTheoryMoveIndex(-1)
    setDeviationInfo(null)
    setMoveEvaluations(new Map())
    setIsEngineThinking(false)
    setIsEvaluating(false)
    setPendingFeedback(null)
    sync()
  }, [])

  /**
   * After starting, if player is black, engine plays the first theory move.
   */
  useEffect(() => {
    if (phase !== 'playing' || !opening) return
    if (playerColor === 'black' && history.length === 0 && trainerEngine?.isReady) {
      // Engine plays the first theory move
      playEngineTheoryMove()
    }
  }, [phase, opening, playerColor, trainerEngine?.isReady])

  /**
   * Play the next engine theory move from the opening mainLine.
   */
  function playEngineTheoryMove() {
    const op = openingRef.current
    if (!op) return

    const idx = theoryIndexRef.current
    if (idx >= op.mainLine.length) {
      // Theory exhausted, switch to engine play
      setIsInTheory(false)
      playEngineMove()
      return
    }

    const moveSan = op.mainLine[idx]
    theoryIndexRef.current = idx + 1

    setTimeout(() => {
      const game = gameRef.current
      const result = game.move(moveSan)
      if (result) {
        setTheoryMoveIndex(prev => prev + 1)
        sync()
      }
    }, 500) // Small delay for natural feel
  }

  /**
   * Play engine move using Stockfish at configured strength.
   */
  async function playEngineMove() {
    if (!trainerEngine?.isReady) return
    setIsEngineThinking(true)

    try {
      const fen = gameRef.current.fen()
      const move = await trainerEngine.getEngineMove(fen, engineStrength)
      if (move) {
        const result = gameRef.current.move(move)
        if (result) sync()
      }
    } catch (err) {
      console.error('[Trainer] Engine move error:', err)
    } finally {
      setIsEngineThinking(false)
    }
  }

  /**
   * Handle the user making a move on the board.
   * Returns evaluation info or null.
   */
  const makeTrainerMove = useCallback(async (from, to, promotion) => {
    const game = gameRef.current
    const op = openingRef.current
    const fenBefore = game.fen()

    // Validate and play the move
    const moveResult = game.move({ from, to, promotion: promotion || undefined })
    if (!moveResult) return null

    const fenAfter = game.fen()
    const moveIndex = game.history().length - 1
    sync()

    let evaluation = null
    // Local copy — React state won't update mid-function
    let stillInTheory = isInTheory

    // Check if we're still in theory
    const currentTheoryIdx = theoryIndexRef.current
    if (stillInTheory && op && currentTheoryIdx < op.mainLine.length) {
      const expectedMove = op.mainLine[currentTheoryIdx]
      if (moveResult.san === expectedMove) {
        // Correct theory move!
        theoryIndexRef.current = currentTheoryIdx + 1
        setTheoryMoveIndex(moveIndex)
        evaluation = { classification: 'book', scoreDiff: 0 }
        setMoveEvaluations(prev => {
          const next = new Map(prev)
          next.set(moveIndex, evaluation)
          return next
        })
        setPendingFeedback({ moveIndex, evaluation, movePlayed: moveResult.san, bestMove: expectedMove })

        // Engine plays next theory move after a beat
        if (!game.isGameOver()) {
          setTimeout(() => playEngineTheoryMove(), 300)
        }
        return evaluation
      } else {
        // Deviated from theory!
        stillInTheory = false
        setIsInTheory(false)
        setDeviationInfo({
          moveIndex,
          expectedMove,
          playedMove: moveResult.san,
        })
      }
    } else if (stillInTheory && op && currentTheoryIdx >= op.mainLine.length) {
      // Theory exhausted
      stillInTheory = false
      setIsInTheory(false)
    }

    // Evaluate the move with Stockfish
    if (trainerEngine?.isReady) {
      setIsEvaluating(true)
      try {
        evaluation = await trainerEngine.evaluateMove(fenBefore, fenAfter)
        if (evaluation) {
          // Convert bestMoveUci to SAN for display
          const tempGame = new Chess(fenBefore)
          try {
            const bestMoveObj = tempGame.move({
              from: evaluation.bestMoveUci?.slice(0, 2),
              to: evaluation.bestMoveUci?.slice(2, 4),
              promotion: evaluation.bestMoveUci?.length > 4 ? evaluation.bestMoveUci[4] : undefined,
            })
            evaluation.bestMoveSan = bestMoveObj?.san || evaluation.bestMoveUci
          } catch {
            evaluation.bestMoveSan = evaluation.bestMoveUci
          }

          setMoveEvaluations(prev => {
            const next = new Map(prev)
            next.set(moveIndex, evaluation)
            return next
          })
          setPendingFeedback({
            moveIndex,
            evaluation,
            movePlayed: moveResult.san,
            bestMove: evaluation.bestMoveSan,
          })
        }
      } catch (err) {
        console.error('[Trainer] Evaluation error:', err)
      }
      setIsEvaluating(false)
    }

    // Engine responds
    if (!game.isGameOver() && game.turn() !== (playerColor === 'white' ? 'w' : 'b')) {
      if (stillInTheory) {
        playEngineTheoryMove()
      } else {
        await playEngineMove()
      }
    }

    return evaluation
  }, [isInTheory, trainerEngine, playerColor, engineStrength])

  /**
   * End the session and go to summary.
   */
  const endSession = useCallback(() => {
    const evals = moveEvaluations
    const playerMoves = [...evals.entries()].filter(([idx]) => {
      const h = gameRef.current.history({ verbose: true })
      if (idx >= h.length) return false
      const move = h[idx]
      return (playerColor === 'white' && move.color === 'w') ||
             (playerColor === 'black' && move.color === 'b')
    })

    const classifications = { book: 0, excellent: 0, good: 0, inaccuracy: 0, mistake: 0, blunder: 0 }
    const keyMoments = []

    for (const [idx, ev] of playerMoves) {
      const cls = ev.classification
      classifications[cls] = (classifications[cls] || 0) + 1
      if (cls === 'mistake' || cls === 'blunder') {
        const h = gameRef.current.history({ verbose: true })
        keyMoments.push({
          moveIndex: idx,
          moveNumber: Math.floor(idx / 2) + 1,
          classification: cls,
          movePlayed: h[idx]?.san,
          bestMove: ev.bestMoveSan || ev.bestMoveUci,
          scoreDiff: ev.scoreDiff,
        })
      }
    }

    const totalEval = playerMoves.filter(([, ev]) => ev.classification !== 'book').length
    const goodMoves = playerMoves.filter(([, ev]) => ev.classification === 'excellent' || ev.classification === 'good').length
    const accuracy = totalEval > 0 ? goodMoves / totalEval : 1

    const summary = {
      opening,
      playerColor,
      totalMoves: playerMoves.length,
      accuracy,
      classifications,
      keyMoments,
      deviationInfo,
      theoryDepth: theoryMoveIndex + 1,
      movesPgn: gameRef.current.pgn(),
    }
    setSessionSummary(summary)
    setPhase('summary')
    return summary
  }, [moveEvaluations, opening, playerColor, theoryMoveIndex, deviationInfo])

  /**
   * Go back to the opening selector.
   */
  const abandonSession = useCallback(() => {
    gameRef.current = new Chess()
    openingRef.current = null
    theoryIndexRef.current = 0
    setPhase('select')
    setOpening(null)
    setHistory([])
    setPosition('start')
    setMoveEvaluations(new Map())
    setIsInTheory(true)
    setDeviationInfo(null)
    setPendingFeedback(null)
    setSessionSummary(null)
  }, [])

  /**
   * Get the next expected theory moves from current position.
   */
  const getTheoryPreview = useCallback(() => {
    const op = openingRef.current
    if (!op || !isInTheory) return []
    const idx = theoryIndexRef.current
    return op.mainLine.slice(idx, idx + 6) // next 6 moves
  }, [isInTheory])

  return {
    // Session
    phase,
    opening,
    playerColor,

    // Game state
    position,
    history,
    turn,
    isGameOver,
    lastMove,

    // Theory
    theoryMoveIndex,
    isInTheory,
    deviationInfo,
    getTheoryPreview,

    // Evaluations
    moveEvaluations,
    isEvaluating,
    pendingFeedback,
    clearFeedback: () => setPendingFeedback(null),
    sessionSummary,

    // Engine
    isEngineThinking,
    engineStrength,
    setEngineStrength,

    // Actions
    startSession,
    makeTrainerMove,
    endSession,
    abandonSession,
  }
}
