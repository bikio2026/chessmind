import { useState } from 'react'
import { X, Upload, BookOpen } from 'lucide-react'
import { sampleGames } from '../lib/sampleGames'

export function PgnLoader({ isOpen, onClose, onLoad }) {
  const [pgnText, setPgnText] = useState('')
  const [error, setError] = useState(null)

  if (!isOpen) return null

  function handleLoad() {
    if (!pgnText.trim()) {
      setError('Pegá un PGN para cargar')
      return
    }
    const success = onLoad(pgnText.trim())
    if (success) {
      setPgnText('')
      setError(null)
      onClose()
    } else {
      setError('PGN inválido — verificá el formato')
    }
  }

  function handleSampleLoad(pgn) {
    const success = onLoad(pgn)
    if (success) {
      setPgnText('')
      setError(null)
      onClose()
    }
  }

  function handleFileUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      setPgnText(event.target.result)
    }
    reader.readAsText(file)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-alt rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-surface-light">
          <h2 className="text-lg font-semibold">Cargar Partida</h2>
          <button onClick={onClose} className="p-1 hover:bg-surface-light rounded transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Sample games */}
          <div>
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen size={14} />
              Partidas famosas
            </h3>
            <div className="space-y-1">
              {sampleGames.map((game, i) => (
                <button
                  key={i}
                  onClick={() => handleSampleLoad(game.pgn)}
                  className="w-full text-left px-3 py-2 text-sm rounded hover:bg-surface-light transition-colors text-text-dim hover:text-text"
                >
                  {game.name}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-surface-light pt-4">
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              Pegar PGN
            </h3>
            <textarea
              value={pgnText}
              onChange={(e) => { setPgnText(e.target.value); setError(null) }}
              placeholder="1. e4 e5 2. Nf3 Nc6 ..."
              className="w-full h-40 bg-surface rounded-lg p-3 text-sm font-mono text-text resize-none border border-surface-light focus:border-accent focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-move-bad text-sm">{error}</p>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleLoad}
              className="flex-1 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/80 transition-colors text-sm"
            >
              Cargar PGN
            </button>
            <label className="flex items-center gap-1.5 px-4 py-2 bg-surface-light rounded-lg cursor-pointer hover:bg-surface-light/80 transition-colors text-sm">
              <Upload size={16} />
              Archivo
              <input type="file" accept=".pgn,.txt" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
