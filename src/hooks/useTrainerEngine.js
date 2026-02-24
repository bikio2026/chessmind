import { useState, useEffect, useRef, useCallback } from 'react'
import { parseBestMove, parseInfoLine } from '../lib/stockfishParser'

/**
 * Dedicated Stockfish worker for the Opening Trainer.
 * Separate from the analyzer's useStockfish to avoid state conflicts.
 * Uses MultiPV 1, supports Skill Level, and provides:
 * - getEngineMove(fen, skillLevel) → Promise<{from, to, promotion?}>
 * - evaluatePosition(fen) → Promise<{score, bestMove}>
 * - evaluateMove(fenBefore, userMove, fenAfter) → Promise<{classification, scoreDiff, bestMove, bestScore, playedScore}>
 */
export function useTrainerEngine() {
  const workerRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const queueRef = useRef([]) // queue of { type, fen, depth, resolve, reject }
  const busyRef = useRef(false)
  const currentTaskRef = useRef(null)
  const scoreAccRef = useRef(null)
  const bestMoveAccRef = useRef(null)
  const turnRef = useRef('w')

  // Initialize worker (Lite only — lighter footprint)
  useEffect(() => {
    let cancelled = false
    const worker = new Worker('/stockfish-18-lite-single.js')

    worker.onerror = (err) => {
      console.error('[TrainerEngine] Worker error:', err.message || err)
    }

    worker.onmessage = (e) => {
      const msg = typeof e.data === 'string' ? e.data : e.data?.toString() || ''

      if (msg === 'uciok') {
        worker.postMessage('isready')
      } else if (msg === 'readyok') {
        if (!cancelled) {
          workerRef.current = worker
          // MultiPV 1, WDL on
          worker.postMessage('setoption name MultiPV value 1')
          worker.postMessage('setoption name UCI_ShowWDL value true')
          setIsReady(true)
        }
      } else if (msg.startsWith('info') && msg.includes(' pv ')) {
        const parsed = parseInfoLine(msg)
        if (parsed?.score) {
          // Normalize to White's perspective
          if (turnRef.current === 'b') {
            parsed.score.value = -parsed.score.value
          }
          scoreAccRef.current = parsed.score
          if (parsed.pv?.[0]) bestMoveAccRef.current = parsed.pv[0]
        }
      } else if (msg.startsWith('bestmove')) {
        const parsed = parseBestMove(msg)
        const task = currentTaskRef.current
        if (task) {
          task.resolve({
            score: scoreAccRef.current,
            bestMoveUci: parsed?.bestMove || bestMoveAccRef.current,
          })
          currentTaskRef.current = null
        }
        busyRef.current = false
        processQueue()
      }
    }

    worker.postMessage('uci')

    return () => {
      cancelled = true
      worker.terminate()
    }
  }, [])

  function processQueue() {
    if (busyRef.current || !workerRef.current || queueRef.current.length === 0) return
    const task = queueRef.current.shift()
    busyRef.current = true
    currentTaskRef.current = task
    scoreAccRef.current = null
    bestMoveAccRef.current = null
    turnRef.current = task.fen.split(' ')[1] || 'w'

    const worker = workerRef.current
    if (task.skillLevel !== undefined) {
      worker.postMessage(`setoption name Skill Level value ${task.skillLevel}`)
    }
    worker.postMessage(`position fen ${task.fen}`)
    worker.postMessage(`go depth ${task.depth}`)
  }

  function enqueue(task) {
    return new Promise((resolve, reject) => {
      queueRef.current.push({ ...task, resolve, reject })
      processQueue()
    })
  }

  /**
   * Get engine move at specified skill level.
   * Returns { from, to, promotion? } in algebraic coords.
   */
  const getEngineMove = useCallback(async (fen, skillLevel = 10) => {
    if (!isReady) return null
    const result = await enqueue({ fen, depth: Math.min(8 + skillLevel, 18), skillLevel })
    if (!result.bestMoveUci) return null
    return {
      from: result.bestMoveUci.slice(0, 2),
      to: result.bestMoveUci.slice(2, 4),
      promotion: result.bestMoveUci.length > 4 ? result.bestMoveUci[4] : undefined,
    }
  }, [isReady])

  /**
   * Evaluate a position at depth 16 (for comparing moves).
   * Returns { score: {type, value}, bestMoveUci }
   */
  const evaluatePosition = useCallback(async (fen) => {
    if (!isReady) return null
    // Reset skill level to max for evaluation
    return enqueue({ fen, depth: 16, skillLevel: 20 })
  }, [isReady])

  /**
   * Evaluate a user's move by comparing position scores before and after.
   * Returns { classification, scoreDiff, bestMoveUci, bestScore, playedScore }
   */
  const evaluateMove = useCallback(async (fenBefore, fenAfter) => {
    if (!isReady) return null

    // Evaluate position before move (what was the best?)
    const before = await evaluatePosition(fenBefore)
    // Evaluate position after move (what did the user get?)
    const after = await evaluatePosition(fenAfter)

    if (!before?.score || !after?.score) return null

    const bestScore = before.score.value // cp, White's perspective
    const playedScore = after.score.value // cp, White's perspective (after user moved)

    // Calculate loss: depends on who moved
    const sideToMove = fenBefore.split(' ')[1] || 'w'
    let scoreDiff
    if (sideToMove === 'w') {
      // White moved: good if score stayed same or improved
      scoreDiff = bestScore - playedScore
    } else {
      // Black moved: score is from White's POV, so black wants lower score
      scoreDiff = playedScore - bestScore
    }
    // Clamp to 0 if move was somehow better than engine expected
    scoreDiff = Math.max(0, scoreDiff)

    const classification = classifyMove(scoreDiff)

    return {
      classification,
      scoreDiff,
      bestMoveUci: before.bestMoveUci,
      bestScore,
      playedScore,
    }
  }, [isReady, evaluatePosition])

  const terminate = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate()
      workerRef.current = null
    }
  }, [])

  return { isReady, getEngineMove, evaluatePosition, evaluateMove, terminate }
}

/**
 * Classify a move based on centipawn loss.
 */
function classifyMove(cpLoss) {
  if (cpLoss <= 5) return 'excellent'
  if (cpLoss <= 20) return 'good'
  if (cpLoss <= 50) return 'inaccuracy'
  if (cpLoss <= 100) return 'mistake'
  return 'blunder'
}

export const CLASSIFICATIONS = {
  book: { label: 'Libro', symbol: '📖', color: 'var(--color-move-book)' },
  excellent: { label: 'Excelente', symbol: '✓✓', color: 'var(--color-move-excellent)' },
  good: { label: 'Buena', symbol: '✓', color: 'var(--color-move-good-light)' },
  inaccuracy: { label: 'Imprecisión', symbol: '?!', color: 'var(--color-move-inaccuracy)' },
  mistake: { label: 'Error', symbol: '?', color: 'var(--color-move-mistake)' },
  blunder: { label: 'Blunder', symbol: '??', color: 'var(--color-move-blunder)' },
}
