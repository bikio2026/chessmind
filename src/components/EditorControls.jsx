import { Play, Trash2, RotateCcw, X } from 'lucide-react'

/**
 * Controls panel for the board editor.
 * Turn selector, castling rights, action buttons, and validation errors.
 */
export function EditorControls({
  turn,
  onTurnChange,
  castling,
  onCastlingChange,
  onClear,
  onReset,
  onAnalyze,
  onCancel,
  validationError,
}) {
  return (
    <div className="flex flex-col gap-2" style={{ maxWidth: 480, width: '100%' }}>
      {/* Turn + Castling row */}
      <div className="flex items-center gap-3 bg-surface-alt rounded-lg px-3 py-2 flex-wrap">
        {/* Turn selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-text-muted font-medium">Turno:</span>
          <button
            onClick={() => onTurnChange('w')}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              turn === 'w'
                ? 'bg-eval-white text-eval-black font-bold'
                : 'text-text-dim hover:text-text'
            }`}
          >
            B
          </button>
          <button
            onClick={() => onTurnChange('b')}
            className={`px-2 py-1 rounded transition-colors cursor-pointer ${
              turn === 'b'
                ? 'bg-eval-black text-eval-white font-bold'
                : 'text-text-dim hover:text-text'
            }`}
          >
            N
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-5 bg-surface-light" />

        {/* Castling rights */}
        <div className="flex items-center gap-2 text-xs text-text-dim">
          <span className="text-text-muted font-medium">Enroque:</span>
          {['K', 'Q', 'k', 'q'].map((right) => (
            <label key={right} className="flex items-center gap-0.5 cursor-pointer">
              <input
                type="checkbox"
                checked={castling[right]}
                onChange={() => onCastlingChange(right)}
                className="accent-accent w-3 h-3"
              />
              <span>{right}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 px-3 py-2 bg-surface-alt rounded-lg text-text-dim hover:text-text hover:bg-surface-light transition-colors text-sm cursor-pointer"
        >
          <X size={14} />
          Cancelar
        </button>
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-2 bg-surface-alt rounded-lg text-text-dim hover:text-text hover:bg-surface-light transition-colors text-sm cursor-pointer"
        >
          <Trash2 size={14} />
          Vaciar
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-2 bg-surface-alt rounded-lg text-text-dim hover:text-text hover:bg-surface-light transition-colors text-sm cursor-pointer"
        >
          <RotateCcw size={14} />
          Inicial
        </button>
        <button
          onClick={onAnalyze}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-accent/15 text-accent rounded-lg hover:bg-accent/25 font-medium text-sm transition-colors cursor-pointer"
        >
          <Play size={14} />
          Analizar
        </button>
      </div>

      {/* Validation error */}
      {validationError && (
        <div className="bg-move-bad/15 border border-move-bad/30 rounded-lg px-3 py-2 text-xs text-move-bad">
          Posición inválida: {validationError}
        </div>
      )}
    </div>
  )
}
