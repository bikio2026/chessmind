import { useState, useEffect, useRef } from 'react'
import { Chess } from 'chess.js'
import { analyzePosition } from '../lib/heuristics'

export function usePositionAnalysis(fen) {
  const [analysis, setAnalysis] = useState(null)
  const cacheRef = useRef(new Map())

  useEffect(() => {
    if (!fen) return

    // Check cache
    if (cacheRef.current.has(fen)) {
      setAnalysis(cacheRef.current.get(fen))
      return
    }

    // Compute heuristics
    try {
      const game = new Chess(fen)
      const result = analyzePosition(game)
      cacheRef.current.set(fen, result)
      // Keep cache size manageable
      if (cacheRef.current.size > 200) {
        const firstKey = cacheRef.current.keys().next().value
        cacheRef.current.delete(firstKey)
      }
      setAnalysis(result)
    } catch {
      setAnalysis(null)
    }
  }, [fen])

  return analysis
}
