import { useState, useEffect, useRef, useCallback } from 'react'
import { parseInfoLine, parseBestMove } from '../lib/stockfishParser'

const isLocal = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

// Local: try full (108MB) then lite fallback
// Production: lite only (7MB, committed to git — full is too large for Vercel)
const SF_VARIANTS = isLocal
  ? [
      { js: '/stockfish-18-single.js', label: 'Stockfish 18' },
      { js: '/stockfish-18-lite-single.js', label: 'Stockfish 18 Lite' },
    ]
  : [
      { js: '/stockfish-18-lite-single.js', label: 'Stockfish 18 Lite' },
    ]

export function useStockfish() {
  const workerRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [lines, setLines] = useState([])
  const [bestMove, setBestMove] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [engineLabel, setEngineLabel] = useState('')
  const [loadingStatus, setLoadingStatus] = useState('')
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

  // Initialize worker with fallback
  useEffect(() => {
    let cancelled = false
    let activeWorker = null

    function tryVariant(index) {
      if (cancelled || index >= SF_VARIANTS.length) {
        console.error('[Stockfish] All variants failed to load')
        setLoadingStatus('Error: no se pudo cargar ningún motor')
        return
      }

      const variant = SF_VARIANTS[index]
      console.log(`[Stockfish] Trying ${variant.label} (${variant.js})...`)
      setLoadingStatus(`Cargando ${variant.label}...`)

      const worker = new Worker(variant.js)
      activeWorker = worker

      const timeout = setTimeout(() => {
        console.warn(`[Stockfish] ${variant.label} timed out, trying fallback...`)
        worker.terminate()
        if (!cancelled) tryVariant(index + 1)
      }, 15000)

      worker.onerror = (err) => {
        console.error(`[Stockfish] ${variant.label} worker error:`, err.message || err)
        clearTimeout(timeout)
        worker.terminate()
        if (!cancelled) tryVariant(index + 1)
      }

      worker.onmessage = (e) => {
        const msg = typeof e.data === 'string' ? e.data : e.data?.toString() || ''

        if (msg === 'uciok') {
          clearTimeout(timeout)
          console.log(`[Stockfish] ${variant.label} initialized OK`)
          setEngineLabel(variant.label)
          setLoadingStatus('')
          workerRef.current = worker
          worker.postMessage('isready')
        } else if (msg === 'readyok') {
          console.log(`[Stockfish] ${variant.label} ready`)
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
    }

    tryVariant(0)

    return () => {
      cancelled = true
      if (activeWorker) activeWorker.terminate()
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

  return { isReady, isAnalyzing, lines, bestMove, analyze, stop, setMultiPV, engineLabel, loadingStatus }
}
