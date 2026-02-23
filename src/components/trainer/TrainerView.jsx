import { useState, useCallback } from 'react'
import { OpeningSelector } from './OpeningSelector'
import { ArrowLeft, BookOpen } from 'lucide-react'

/**
 * TrainerView — Main container for the Opening Trainer tab.
 * Manages three phases: 'select', 'playing', 'summary'.
 * Phase 2 (playing) and Phase 3 (summary) will be implemented next.
 */
export function TrainerView() {
  const [phase, setPhase] = useState('select') // 'select' | 'playing' | 'summary'
  const [selectedOpening, setSelectedOpening] = useState(null)

  const handleSelectOpening = useCallback((opening) => {
    setSelectedOpening(opening)
    setPhase('playing')
  }, [])

  const handleBackToSelector = useCallback(() => {
    setSelectedOpening(null)
    setPhase('select')
  }, [])

  if (phase === 'select') {
    return (
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
            <BookOpen size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-text">Elegí una apertura</h2>
            <p className="text-xs text-text-dim">Seleccioná la apertura que querés practicar y leé su explicación antes de empezar</p>
          </div>
        </div>

        <OpeningSelector onSelect={handleSelectOpening} />
      </div>
    )
  }

  if (phase === 'playing') {
    // TODO: Implement TrainerSession in Phase 2
    return (
      <div className="max-w-7xl mx-auto">
        <button
          onClick={handleBackToSelector}
          className="flex items-center gap-1.5 text-sm text-text-dim hover:text-text transition-colors mb-4"
        >
          <ArrowLeft size={14} />
          Volver a aperturas
        </button>

        <div className="bg-surface-alt rounded-xl border border-surface-light/50 p-8 text-center">
          <h2 className="text-xl font-bold text-text mb-2">
            Entrenando: {selectedOpening?.name}
          </h2>
          <p className="text-sm text-text-dim mb-4">
            Jugás con {selectedOpening?.color === 'white' ? 'blancas' : 'negras'}
          </p>
          <p className="text-xs text-text-muted">
            Fase 2: Motor de juego + feedback por jugada — próxima sesión
          </p>
        </div>
      </div>
    )
  }

  // phase === 'summary'
  return (
    <div className="max-w-7xl mx-auto text-center py-12">
      <p className="text-text-muted">Resumen — Fase 4</p>
      <button
        onClick={handleBackToSelector}
        className="mt-4 px-4 py-2 bg-accent/15 text-accent rounded-lg hover:bg-accent/25 transition-colors text-sm"
      >
        Otra apertura
      </button>
    </div>
  )
}
