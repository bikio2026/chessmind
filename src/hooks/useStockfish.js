import { useState, useEffect, useRef, useCallback } from 'react'
import { parseInfoLine, parseBestMove } from '../lib/stockfishParser'

export function useStockfish() {
  const workerRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [lines, setLines] = useState([])
  const [bestMove, setBestMove] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const debounceRef = useRef(null)
  const multiPvRef = useRef(3)

  // UCI state machine refs
  const isSearchingRef = useRef(false)
  const pendingRef = useRef(null) // { fen, depth } — queued analysis
  const pvAccRef = useRef({})
  const turnRef = useRef('w') // current side to move, for score normalization

  // Start a search (only call when NOT currently searching)
  function startSearch(worker, fen, depth) {
    pvAccRef.current = {}
    isSearchingRef.current = true
    turnRef.current = fen.split(' ')[1] || 'w' // extract side to move from FEN
    setLines([])
    setBestMove(null)
    setIsAnalyzing(true)
    worker.postMessage(`position fen ${fen}`)
    worker.postMessage(`go depth ${depth}`)
  }

  // Initialize worker
  useEffect(() => {
    const worker = new Worker('/stockfish-18-single.js')
    workerRef.current = worker

    worker.onmessage = (e) => {
      const msg = typeof e.data === 'string' ? e.data : e.data?.toString() || ''

      if (msg === 'uciok') {
        worker.postMessage('isready')
      } else if (msg === 'readyok') {
        setIsReady(true)
      } else if (msg.startsWith('info') && msg.includes(' pv ')) {
        const parsed = parseInfoLine(msg)
        if (parsed && parsed.score) {
          // Normalize score to White's perspective (Stockfish reports from side-to-move)
          if (turnRef.current === 'b') {
            parsed.score.value = -parsed.score.value
            if (parsed.wdl) {
              const { win, loss } = parsed.wdl
              parsed.wdl.win = loss
              parsed.wdl.loss = win
            }
          }
          pvAccRef.current[parsed.multipv] = parsed
          const sortedLines = Object.values(pvAccRef.current)
            .sort((a, b) => a.multipv - b.multipv)
          setLines([...sortedLines])
        }
      } else if (msg.startsWith('bestmove')) {
        const parsed = parseBestMove(msg)
        setBestMove(parsed?.bestMove || null)
        isSearchingRef.current = false
        setIsAnalyzing(false)

        // If there's a pending analysis, start it now
        const pending = pendingRef.current
        if (pending) {
          pendingRef.current = null
          startSearch(worker, pending.fen, pending.depth)
        }
      }
    }

    worker.postMessage('uci')

    return () => {
      worker.terminate()
    }
  }, [])

  // Configure MultiPV after ready
  useEffect(() => {
    if (isReady && workerRef.current) {
      workerRef.current.postMessage(`setoption name MultiPV value ${multiPvRef.current}`)
      workerRef.current.postMessage('setoption name UCI_ShowWDL value true')
    }
  }, [isReady])

  const analyze = useCallback((fen, depth = 18) => {
    if (!isReady || !workerRef.current) return

    // Debounce rapid position changes (300ms)
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      const worker = workerRef.current
      if (!worker) return

      if (isSearchingRef.current) {
        // Queue this analysis and stop current search
        // When bestmove arrives, the pending analysis will start
        pendingRef.current = { fen, depth }
        worker.postMessage('stop')
      } else {
        startSearch(worker, fen, depth)
      }
    }, 300)
  }, [isReady])

  const stop = useCallback(() => {
    if (workerRef.current && isSearchingRef.current) {
      pendingRef.current = null // Don't start queued analysis
      workerRef.current.postMessage('stop')
    }
  }, [])

  const setMultiPV = useCallback((n) => {
    multiPvRef.current = n
    if (isReady && workerRef.current) {
      workerRef.current.postMessage('stop')
      workerRef.current.postMessage(`setoption name MultiPV value ${n}`)
    }
  }, [isReady])

  return { isReady, isAnalyzing, lines, bestMove, analyze, stop, setMultiPV }
}
