import { useState, useMemo, useCallback } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'

export function Board({
  position,
  onMove,
  orientation = 'white',
  lastMove,
  pieces,
  arrows = [],
  editMode = false,
  onEditPlace,
  onEditRemove,
}) {
  const [selectedSquare, setSelectedSquare] = useState(null)

  // Get legal moves for a square using a temp Chess instance
  const getLegalMoves = useCallback((square) => {
    try {
      const game = new Chess(position)
      return game.moves({ square, verbose: true })
    } catch {
      return []
    }
  }, [position])

  // Determine if a piece on a square belongs to the side to move
  const isOwnPiece = useCallback((square) => {
    try {
      const game = new Chess(position)
      const piece = game.get(square)
      return piece && piece.color === game.turn()
    } catch {
      return false
    }
  }, [position])

  // Build square styles: last move + selection + legal targets
  const squareStyles = useMemo(() => {
    const styles = {}

    // In edit mode, no highlights
    if (editMode) return styles

    // Last move highlight
    if (lastMove) {
      styles[lastMove.from] = { backgroundColor: 'rgba(233, 69, 96, 0.25)' }
      styles[lastMove.to] = { backgroundColor: 'rgba(233, 69, 96, 0.35)' }
    }

    // Selected square + legal moves
    if (selectedSquare) {
      styles[selectedSquare] = {
        ...styles[selectedSquare],
        backgroundColor: 'rgba(255, 193, 7, 0.5)',
      }

      try {
        const game = new Chess(position)
        const moves = game.moves({ square: selectedSquare, verbose: true })
        for (const move of moves) {
          const targetPiece = game.get(move.to)
          if (targetPiece) {
            // Capture: ring around the square
            styles[move.to] = {
              ...styles[move.to],
              background: 'radial-gradient(transparent 55%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.25) 70%, transparent 70%)',
            }
          } else {
            // Empty: dot in center
            styles[move.to] = {
              ...styles[move.to],
              background: 'radial-gradient(circle, rgba(0,0,0,0.2) 22%, transparent 22%)',
            }
          }
        }
      } catch { /* invalid position */ }
    }

    return styles
  }, [lastMove, selectedSquare, position, editMode])

  function handleSquareClick({ piece, square }) {
    // Edit mode: place or remove piece
    if (editMode) {
      if (onEditPlace) onEditPlace(square)
      return
    }

    if (!selectedSquare) {
      // No selection — select if it's own piece
      if (piece && isOwnPiece(square)) {
        setSelectedSquare(square)
      }
      return
    }

    // Already have a selection
    if (square === selectedSquare) {
      // Click same square — deselect
      setSelectedSquare(null)
      return
    }

    // Try to move from selectedSquare → square
    const moves = getLegalMoves(selectedSquare)
    const isLegal = moves.some(m => m.to === square)

    if (isLegal) {
      const isPawn = moves.find(m => m.to === square)?.piece === 'p'
      const isPromotion = isPawn && (square[1] === '1' || square[1] === '8')
      const move = onMove(selectedSquare, square, isPromotion ? 'q' : undefined)
      setSelectedSquare(null)
      if (!move && piece && isOwnPiece(square)) {
        // Move failed but clicked own piece — select it
        setSelectedSquare(square)
      }
    } else if (piece && isOwnPiece(square)) {
      // Clicked a different own piece — switch selection
      setSelectedSquare(square)
    } else {
      // Clicked empty or opponent square that isn't a legal target
      setSelectedSquare(null)
    }
  }

  function onDrop({ sourceSquare, targetSquare, piece }) {
    // Edit mode: free-form piece movement
    if (editMode) {
      if (sourceSquare && targetSquare && sourceSquare !== targetSquare) {
        if (onEditPlace) onEditPlace(targetSquare, sourceSquare)
      }
      return true
    }

    const isPawn = piece?.pieceType?.toLowerCase() === 'p'
    const promotion = isPawn ? 'q' : undefined
    const move = onMove(sourceSquare, targetSquare, promotion)
    setSelectedSquare(null)
    return move !== null
  }

  function handleRightClick({ square }) {
    if (editMode && onEditRemove) {
      onEditRemove(square)
    }
  }

  return (
    <div style={{ width: 480, maxWidth: '100%' }}>
      <Chessboard
        options={{
          id: 'main-board',
          position,
          onPieceDrop: onDrop,
          onSquareClick: handleSquareClick,
          onSquareRightClick: editMode ? handleRightClick : undefined,
          boardOrientation: orientation,
          squareStyles,
          boardStyle: {
            borderRadius: '4px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          },
          darkSquareStyle: { backgroundColor: '#779952' },
          lightSquareStyle: { backgroundColor: '#edeed1' },
          pieces,
          arrows,
          clearArrowsOnClick: false,
          animationDurationInMs: editMode ? 0 : 200,
        }}
      />
    </div>
  )
}
