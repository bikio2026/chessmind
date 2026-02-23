import { useState, useCallback } from 'react'

const STORAGE_KEY = 'chessmind-trainer-sessions'
const STATS_KEY = 'chessmind-trainer-stats'

/**
 * Persistence hook for the Opening Trainer.
 * Saves session results and per-opening stats to localStorage.
 * Designed to be swapped with Supabase in the future.
 */
export function useTrainerData() {
  const [sessions, setSessions] = useState(() => loadSessions())
  const [stats, setStats] = useState(() => loadStats())

  /**
   * Save a completed training session.
   */
  const saveSession = useCallback((summary) => {
    if (!summary?.opening) return

    const session = {
      id: crypto.randomUUID(),
      openingId: summary.opening.id,
      openingName: summary.opening.name,
      playerColor: summary.playerColor,
      accuracy: summary.accuracy,
      totalMoves: summary.totalMoves,
      theoryDepth: summary.theoryDepth,
      classifications: summary.classifications,
      deviationInfo: summary.deviationInfo
        ? {
            moveIndex: summary.deviationInfo.moveIndex,
            playedMove: summary.deviationInfo.playedMove,
            expectedMove: summary.deviationInfo.expectedMove,
          }
        : null,
      keyMomentsCount: summary.keyMoments?.length || 0,
      createdAt: new Date().toISOString(),
    }

    // Update sessions list (keep last 50)
    setSessions((prev) => {
      const next = [session, ...prev].slice(0, 50)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch { /* storage full — OK */ }
      return next
    })

    // Update per-opening stats
    setStats((prev) => {
      const openingId = summary.opening.id
      const existing = prev[openingId] || {
        sessionsPlayed: 0,
        totalAccuracy: 0,
        totalTheoryDepth: 0,
        bestAccuracy: 0,
        lastPlayedAt: null,
      }

      const updated = {
        ...existing,
        sessionsPlayed: existing.sessionsPlayed + 1,
        totalAccuracy: existing.totalAccuracy + summary.accuracy,
        totalTheoryDepth: existing.totalTheoryDepth + summary.theoryDepth,
        bestAccuracy: Math.max(existing.bestAccuracy, summary.accuracy),
        lastPlayedAt: new Date().toISOString(),
      }

      const next = { ...prev, [openingId]: updated }
      try {
        localStorage.setItem(STATS_KEY, JSON.stringify(next))
      } catch { /* storage full — OK */ }
      return next
    })
  }, [])

  /**
   * Get stats for a specific opening.
   * Returns { sessionsPlayed, avgAccuracy, avgTheoryDepth, bestAccuracy, lastPlayedAt } or null.
   */
  const getOpeningStats = useCallback((openingId) => {
    const s = stats[openingId]
    if (!s || s.sessionsPlayed === 0) return null
    return {
      sessionsPlayed: s.sessionsPlayed,
      avgAccuracy: s.totalAccuracy / s.sessionsPlayed,
      avgTheoryDepth: Math.round(s.totalTheoryDepth / s.sessionsPlayed),
      bestAccuracy: s.bestAccuracy,
      lastPlayedAt: s.lastPlayedAt,
    }
  }, [stats])

  /**
   * Get recent sessions (optionally filtered by opening).
   */
  const getRecentSessions = useCallback((openingId = null, limit = 5) => {
    if (openingId) {
      return sessions.filter((s) => s.openingId === openingId).slice(0, limit)
    }
    return sessions.slice(0, limit)
  }, [sessions])

  return { saveSession, getOpeningStats, getRecentSessions, stats }
}

function loadSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function loadStats() {
  try {
    const raw = localStorage.getItem(STATS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}
