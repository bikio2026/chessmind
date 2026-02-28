import { useState, useMemo, useCallback, useRef } from 'react'
import { sampleGames } from '../lib/sampleGames'

/**
 * Hook for the game library — local filtering + Lichess API search.
 */
export function useGameLibrary() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    era: null,
    result: null,
    ecoGroup: null,   // 'A', 'B', 'C', 'D', 'E'
    ratingRange: null, // '2400' | '2600' | '2700'
    yearRange: null,   // '1900' | '1950' | '1975' | '2000'
  })
  const [activeTab, setActiveTab] = useState('collection') // collection | lichess | manual

  // Lichess state
  const [lichessQuery, setLichessQuery] = useState('')
  const [lichessResults, setLichessResults] = useState([])
  const [lichessLoading, setLichessLoading] = useState(false)
  const [lichessError, setLichessError] = useState(null)
  const abortRef = useRef(null)

  // Filter curated collection
  const filteredGames = useMemo(() => {
    let games = sampleGames

    // Text search (player name, opening, event, tags)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      games = games.filter(g => {
        const searchable = [
          g.name, g.white, g.black, g.opening, g.event,
          ...(g.tags || []),
        ].filter(Boolean).join(' ').toLowerCase()
        return searchable.includes(q)
      })
    }

    // Era filter
    if (filters.era) {
      games = games.filter(g => g.era === filters.era)
    }

    // Result filter
    if (filters.result) {
      games = games.filter(g => g.result === filters.result)
    }

    // ECO group filter (first letter of ECO code)
    if (filters.ecoGroup) {
      games = games.filter(g => g.eco && g.eco[0] === filters.ecoGroup)
    }

    // Rating range filter
    if (filters.ratingRange) {
      const min = parseInt(filters.ratingRange)
      games = games.filter(g => {
        const maxElo = Math.max(g.whiteElo || 0, g.blackElo || 0)
        if (min === 2700) return maxElo >= 2700
        if (min === 2600) return maxElo >= 2600 && maxElo < 2700
        if (min === 2400) return maxElo >= 2400 && maxElo < 2600
        return maxElo < 2400 || !maxElo
      })
    }

    // Year range filter
    if (filters.yearRange) {
      const yr = parseInt(filters.yearRange)
      games = games.filter(g => {
        if (!g.year) return false
        if (yr === 2000) return g.year >= 2000
        if (yr === 1975) return g.year >= 1975 && g.year < 2000
        if (yr === 1950) return g.year >= 1950 && g.year < 1975
        if (yr === 1900) return g.year >= 1900 && g.year < 1950
        return g.year < 1900
      })
    }

    return games
  }, [searchQuery, filters])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setFilters({ era: null, result: null, ecoGroup: null, ratingRange: null, yearRange: null })
  }, [])

  // Update a single filter
  const setFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: prev[key] === value ? null : value }))
  }, [])

  // Lichess search by player username
  const searchLichess = useCallback(async (username) => {
    if (!username.trim()) return
    setLichessLoading(true)
    setLichessError(null)
    setLichessResults([])

    // Abort previous request
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      const baseUrl = isLocal ? 'http://localhost:3056' : ''
      const res = await fetch(`${baseUrl}/api/lichess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'playerGames', params: { username: username.trim(), max: 20 } }),
        signal: controller.signal,
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Error ${res.status}`)
      }

      const data = await res.json()
      setLichessResults(data.games || [])
    } catch (err) {
      if (err.name !== 'AbortError') {
        setLichessError(err.message || 'Error buscando en Lichess')
      }
    } finally {
      setLichessLoading(false)
    }
  }, [])

  return {
    // Collection tab
    searchQuery, setSearchQuery,
    filters, setFilter, clearFilters,
    filteredGames,
    totalGames: sampleGames.length,

    // Lichess tab
    lichessQuery, setLichessQuery,
    lichessResults, lichessLoading, lichessError,
    searchLichess,

    // Tab management
    activeTab, setActiveTab,
  }
}
