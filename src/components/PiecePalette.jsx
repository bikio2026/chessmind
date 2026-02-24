import { Eraser } from 'lucide-react'

const WHITE_PIECES = ['wK', 'wQ', 'wR', 'wB', 'wN', 'wP']
const BLACK_PIECES = ['bK', 'bQ', 'bR', 'bB', 'bN', 'bP']

// Unicode fallback for the classic theme (no custom pieces)
const UNICODE_PIECES = {
  wK: '\u2654', wQ: '\u2655', wR: '\u2656', wB: '\u2657', wN: '\u2658', wP: '\u2659',
  bK: '\u265A', bQ: '\u265B', bR: '\u265C', bB: '\u265D', bN: '\u265E', bP: '\u265F',
}

/**
 * Piece palette for the board editor.
 * Horizontal toolbar above the board with 12 pieces + eraser.
 */
export function PiecePalette({ selectedPiece, onSelect, customPieces }) {
  function renderPieceButton(code) {
    const isActive = selectedPiece === code
    const PieceComponent = customPieces?.[code]

    return (
      <button
        key={code}
        onClick={() => onSelect(isActive ? null : code)}
        className={`w-9 h-9 flex items-center justify-center rounded-md transition-all cursor-pointer
          ${isActive
            ? 'bg-accent/20 ring-2 ring-accent scale-110'
            : 'hover:bg-surface-light/70'
          }`}
        title={code}
      >
        {PieceComponent ? (
          <span className="w-7 h-7 flex items-center justify-center">
            <PieceComponent />
          </span>
        ) : (
          <span className="text-xl leading-none select-none">
            {UNICODE_PIECES[code]}
          </span>
        )}
      </button>
    )
  }

  return (
    <div
      className="flex items-center gap-0.5 bg-surface-alt rounded-lg p-1.5 flex-wrap justify-center"
      style={{ maxWidth: 480, width: '100%' }}
    >
      {/* White pieces */}
      {WHITE_PIECES.map(renderPieceButton)}

      {/* Separator */}
      <div className="w-px h-7 bg-surface-light mx-1" />

      {/* Black pieces */}
      {BLACK_PIECES.map(renderPieceButton)}

      {/* Separator */}
      <div className="w-px h-7 bg-surface-light mx-1" />

      {/* Eraser */}
      <button
        onClick={() => onSelect(selectedPiece === 'eraser' ? null : 'eraser')}
        className={`w-9 h-9 flex items-center justify-center rounded-md transition-all cursor-pointer
          ${selectedPiece === 'eraser'
            ? 'bg-move-bad/20 ring-2 ring-move-bad scale-110'
            : 'hover:bg-surface-light/70'
          }`}
        title="Borrar pieza"
      >
        <Eraser size={18} className="text-text-dim" />
      </button>
    </div>
  )
}
