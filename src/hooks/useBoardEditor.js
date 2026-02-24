import { useState, useRef, useCallback } from 'react'
import { Chess, validateFen } from 'chess.js'

/**
 * Hook for the Board Position Editor.
 * Manages a scratch Chess instance for free-form piece placement,
 * FEN synchronization, castling/turn controls, and validation.
 */
export function useBoardEditor() {
  const editorGameRef = useRef(new Chess())
  const [isEditMode, setIsEditMode] = useState(false)
  const [editorFen, setEditorFen] = useState('')
  const [selectedPiece, setSelectedPiece] = useState(null) // 'wP','bQ','eraser', etc.
  const [validationError, setValidationError] = useState(null)

  // Derive turn and castling from current FEN
  const fenParts = editorFen.split(' ')
  const editorTurn = fenParts[1] || 'w'
  const castlingStr = fenParts[2] || '-'
  const castlingRights = {
    K: castlingStr.includes('K'),
    Q: castlingStr.includes('Q'),
    k: castlingStr.includes('k'),
    q: castlingStr.includes('q'),
  }

  const syncFen = useCallback(() => {
    setEditorFen(editorGameRef.current.fen())
    setValidationError(null)
  }, [])

  /**
   * Rebuild the FEN string with modified turn or castling fields.
   */
  const rebuildFen = useCallback((overrides = {}) => {
    const game = editorGameRef.current
    const parts = game.fen().split(' ')
    // parts: [position, turn, castling, enpassant, halfmove, fullmove]

    if (overrides.turn) {
      parts[1] = overrides.turn
    }
    if (overrides.castling !== undefined) {
      parts[2] = overrides.castling || '-'
    }

    const newFen = parts.join(' ')
    try {
      game.load(newFen, { skipValidation: true })
      syncFen()
    } catch {
      // If load fails, just update the display
      setEditorFen(newFen)
    }
  }, [syncFen])

  /**
   * Enter edit mode — resets to starting position.
   */
  const enterEditMode = useCallback(() => {
    editorGameRef.current = new Chess()
    setIsEditMode(true)
    setSelectedPiece(null)
    setValidationError(null)
    syncFen()
  }, [syncFen])

  /**
   * Exit edit mode without applying changes.
   */
  const exitEditMode = useCallback(() => {
    setIsEditMode(false)
    setSelectedPiece(null)
    setValidationError(null)
    setEditorFen('')
  }, [])

  /**
   * Place a piece on a square, or remove if eraser/no piece selected.
   * Also handles drag-move: if fromSquare is provided, moves the piece from there.
   */
  const placePiece = useCallback((square, fromSquare) => {
    const game = editorGameRef.current

    if (fromSquare && fromSquare !== square) {
      // Drag move: move piece from fromSquare to square
      const piece = game.get(fromSquare)
      if (piece) {
        game.remove(fromSquare)
        game.put(piece, square)
        syncFen()
        return
      }
    }

    if (selectedPiece === 'eraser') {
      game.remove(square)
      syncFen()
      return
    }

    if (!selectedPiece) {
      // No piece selected: remove existing piece (toggle behavior)
      const existing = game.get(square)
      if (existing) {
        game.remove(square)
        syncFen()
      }
      return
    }

    // Place the selected piece
    const color = selectedPiece[0] === 'w' ? 'w' : 'b'
    const type = selectedPiece[1].toLowerCase()
    game.put({ type, color }, square)
    syncFen()
  }, [selectedPiece, syncFen])

  /**
   * Remove a piece from a square (right-click action).
   */
  const removePiece = useCallback((square) => {
    editorGameRef.current.remove(square)
    syncFen()
  }, [syncFen])

  /**
   * Update the board from a FEN string typed by the user.
   * Only attempts to load when the FEN has all 6 fields (avoids loading intermediate states).
   */
  const updateFenFromInput = useCallback((fen) => {
    // Always update the text immediately so the user sees what they type
    setEditorFen(fen)

    // Only try to load if FEN looks complete (6 space-separated fields)
    const parts = fen.trim().split(/\s+/)
    if (parts.length < 4) return // Need at least position + turn + castling + en passant

    try {
      editorGameRef.current.load(fen, { skipValidation: true })
      // Re-sync to normalize the FEN from chess.js (may differ slightly)
      // but DON'T overwrite the user's input — only update if load succeeded
      setValidationError(null)
    } catch {
      // Invalid FEN — just keep the text, user is still typing
    }
  }, [])

  /**
   * Change whose turn it is.
   */
  const setEditorTurn = useCallback((turn) => {
    rebuildFen({ turn })
  }, [rebuildFen])

  /**
   * Toggle a castling right (K, Q, k, q).
   */
  const toggleCastlingRight = useCallback((right) => {
    const game = editorGameRef.current
    const parts = game.fen().split(' ')
    const current = parts[2] || '-'

    let newCastling
    if (current.includes(right)) {
      // Remove the right
      newCastling = current.replace(right, '')
      if (!newCastling) newCastling = '-'
    } else {
      // Add the right (maintain standard order: KQkq)
      const order = 'KQkq'
      const rights = (current === '-' ? '' : current) + right
      newCastling = order.split('').filter(c => rights.includes(c)).join('')
    }

    rebuildFen({ castling: newCastling })
  }, [rebuildFen])

  /**
   * Clear the board (empty).
   */
  const clearBoard = useCallback(() => {
    editorGameRef.current.clear()
    syncFen()
  }, [syncFen])

  /**
   * Reset the board to the starting position.
   */
  const resetBoard = useCallback(() => {
    editorGameRef.current.reset()
    syncFen()
  }, [syncFen])

  /**
   * Validate the current position and apply it to the analyzer.
   * Returns true if applied, false if validation failed.
   */
  const validateAndApply = useCallback((loadFenCallback) => {
    const fen = editorGameRef.current.fen()
    const result = validateFen(fen)

    if (!result.ok) {
      setValidationError(result.error || 'Posición inválida')
      return false
    }

    const success = loadFenCallback(fen)
    if (success) {
      setIsEditMode(false)
      setSelectedPiece(null)
      setValidationError(null)
      setEditorFen('')
      return true
    } else {
      setValidationError('No se pudo cargar la posición')
      return false
    }
  }, [])

  return {
    // State
    isEditMode,
    editorFen,
    selectedPiece,
    validationError,
    editorTurn,
    castlingRights,

    // Actions
    enterEditMode,
    exitEditMode,
    selectPalettePiece: setSelectedPiece,
    placePiece,
    removePiece,
    updateFenFromInput,
    setEditorTurn,
    toggleCastlingRight,
    clearBoard,
    resetBoard,
    validateAndApply,
  }
}
