import { useState, useRef, useCallback } from 'react'
import { Chess } from 'chess.js'

export function useChessGame() {
  const gameRef = useRef(new Chess())
  const historyRef = useRef([])
  const moveIndexRef = useRef(-1)

  // All React state — synced from refs
  const [state, setState] = useState({
    position: gameRef.current.fen(),
    history: [],
    currentMoveIndex: -1,
    turn: 'w',
    isGameOver: false,
  })

  const sync = useCallback(() => {
    const g = gameRef.current
    setState({
      position: g.fen(),
      history: [...historyRef.current],
      currentMoveIndex: moveIndexRef.current,
      turn: g.turn(),
      isGameOver: g.isGameOver(),
    })
  }, [])

  const makeMove = useCallback((from, to, promotion = 'q') => {
    const game = gameRef.current
    try {
      const move = game.move({ from, to, promotion })
      if (move) {
        const newHistory = [...historyRef.current.slice(0, moveIndexRef.current + 1), move]
        historyRef.current = newHistory
        moveIndexRef.current = newHistory.length - 1
        sync()
        return move
      }
    } catch {
      // Invalid move
    }
    return null
  }, [sync])

  const goToMove = useCallback((index) => {
    const fullHistory = historyRef.current
    if (index < -1 || index >= fullHistory.length) return

    const game = gameRef.current
    game.reset()
    for (let i = 0; i <= index; i++) {
      game.move(fullHistory[i].san)
    }
    moveIndexRef.current = index
    sync()
  }, [sync])

  const goForward = useCallback(() => {
    const fullHistory = historyRef.current
    const idx = moveIndexRef.current
    if (idx < fullHistory.length - 1) {
      gameRef.current.move(fullHistory[idx + 1].san)
      moveIndexRef.current = idx + 1
      sync()
    }
  }, [sync])

  const goBack = useCallback(() => {
    if (moveIndexRef.current >= 0) {
      gameRef.current.undo()
      moveIndexRef.current -= 1
      sync()
    }
  }, [sync])

  const goToStart = useCallback(() => {
    goToMove(-1)
  }, [goToMove])

  const goToEnd = useCallback(() => {
    goToMove(historyRef.current.length - 1)
  }, [goToMove])

  const loadPgn = useCallback((pgnString) => {
    const game = gameRef.current
    game.reset()
    try {
      game.loadPgn(pgnString)
      const verboseHistory = game.history({ verbose: true })
      historyRef.current = verboseHistory
      // Start at move 0 (first move) so user can navigate forward
      game.reset()
      game.move(verboseHistory[0].san)
      moveIndexRef.current = 0
      sync()
      return true
    } catch (e) {
      console.error('PGN load error:', e)
      return false
    }
  }, [sync])

  const reset = useCallback(() => {
    gameRef.current.reset()
    historyRef.current = []
    moveIndexRef.current = -1
    sync()
  }, [sync])

  const loadFen = useCallback((fen) => {
    try {
      gameRef.current.load(fen)
      historyRef.current = []
      moveIndexRef.current = -1
      sync()
      return true
    } catch {
      return false
    }
  }, [sync])

  return {
    position: state.position,
    history: state.history,
    currentMoveIndex: state.currentMoveIndex,
    turn: state.turn,
    isGameOver: state.isGameOver,
    makeMove,
    goToMove,
    goForward,
    goBack,
    goToStart,
    goToEnd,
    loadPgn,
    loadFen,
    reset,
  }
}
