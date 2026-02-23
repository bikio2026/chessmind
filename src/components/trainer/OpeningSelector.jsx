import { useState, useMemo } from 'react'
import { OPENINGS, OPENING_CATEGORIES, getOpeningsByCategory } from '../../data/openings'
import { Search, BookOpen, Swords, ChevronRight, X, BarChart3 } from 'lucide-react'

export function OpeningSelector({ onSelect, getOpeningStats }) {
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const grouped = useMemo(() => getOpeningsByCategory(), [])

  const filtered = useMemo(() => {
    if (!search.trim()) return null
    const q = search.toLowerCase()
    return OPENINGS.filter(o =>
      o.name.toLowerCase().includes(q) ||
      o.eco.toLowerCase().includes(q) ||
      o.description.toLowerCase().includes(q)
    )
  }, [search])

  const selected = useMemo(() => {
    if (!selectedId) return null
    return OPENINGS.find(o => o.id === selectedId) || null
  }, [selectedId])

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full max-w-5xl mx-auto">
      {/* Left: Opening List */}
      <div className="flex-1 min-w-0">
        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar apertura por nombre o código ECO..."
            className="w-full bg-surface-alt border border-surface-light rounded-lg pl-9 pr-3 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search results */}
        {filtered !== null ? (
          <div className="space-y-1.5">
            <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
            </h3>
            {filtered.map(opening => (
              <OpeningCard
                key={opening.id}
                opening={opening}
                isSelected={selectedId === opening.id}
                onClick={() => setSelectedId(opening.id)}
                stats={getOpeningStats?.(opening.id)}
              />
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-text-muted py-8 text-center">
                No se encontraron aperturas
              </p>
            )}
          </div>
        ) : (
          /* Grouped by category */
          <div className="space-y-5">
            {OPENING_CATEGORIES.map(cat => {
              const openings = grouped[cat.id]?.openings || []
              if (openings.length === 0) return null
              return (
                <div key={cat.id}>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-accent">{cat.name}</h3>
                    <span className="text-[10px] text-text-muted">{cat.description}</span>
                  </div>
                  <div className="space-y-1.5">
                    {openings.map(opening => (
                      <OpeningCard
                        key={opening.id}
                        opening={opening}
                        isSelected={selectedId === opening.id}
                        onClick={() => setSelectedId(opening.id)}
                        stats={getOpeningStats?.(opening.id)}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Right: Opening Detail */}
      <div className="lg:w-[380px] shrink-0">
        {selected ? (
          <OpeningDetail opening={selected} onStart={onSelect} stats={getOpeningStats?.(selected.id)} />
        ) : (
          <div className="bg-surface-alt rounded-xl p-6 text-center border border-surface-light/50">
            <BookOpen size={40} className="mx-auto text-text-muted mb-3 opacity-50" />
            <p className="text-sm text-text-dim">Seleccioná una apertura para ver sus detalles</p>
          </div>
        )}
      </div>
    </div>
  )
}

function OpeningCard({ opening, isSelected, onClick, stats }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-3 group ${
        isSelected
          ? 'bg-accent/15 border border-accent/30 text-text'
          : 'bg-surface-alt hover:bg-surface-light border border-transparent text-text-dim hover:text-text'
      }`}
    >
      {/* Color indicator */}
      <span className={`w-4 h-4 rounded-full border shrink-0 ${
        opening.color === 'white'
          ? 'bg-eval-white border-text-muted/30'
          : 'bg-eval-black border-text-muted/50'
      }`} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate">{opening.name}</span>
          <span className="text-[10px] font-mono text-text-muted shrink-0">{opening.eco}</span>
        </div>
        <p className="text-xs text-text-muted truncate mt-0.5">
          {opening.description.slice(0, 80)}...
        </p>
      </div>

      {/* Stats badge (if played before) */}
      {stats && (
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] font-medium text-accent">
            {Math.round(stats.avgAccuracy * 100)}%
          </span>
          <span className="text-[9px] text-text-muted">
            ×{stats.sessionsPlayed}
          </span>
        </div>
      )}

      <ChevronRight size={14} className={`shrink-0 transition-colors ${isSelected ? 'text-accent' : 'text-text-muted group-hover:text-text-dim'}`} />
    </button>
  )
}

function OpeningDetail({ opening, onStart, stats }) {
  return (
    <div className="bg-surface-alt rounded-xl border border-surface-light/50 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-surface-light/50">
        <div className="flex items-center gap-2 mb-1">
          <span className={`w-4 h-4 rounded-full border ${
            opening.color === 'white' ? 'bg-eval-white border-text-muted/30' : 'bg-eval-black border-text-muted/50'
          }`} />
          <h2 className="text-lg font-bold text-text">{opening.name}</h2>
          <span className="text-xs font-mono text-text-muted">{opening.eco}</span>
        </div>
        <p className="text-xs text-text-dim">
          Jugás con {opening.color === 'white' ? 'blancas' : 'negras'}
        </p>
      </div>

      {/* Stats (if played before) */}
      {stats && (
        <div className="px-5 py-3 border-b border-surface-light/50 bg-surface/50">
          <div className="flex items-center gap-1.5 mb-2">
            <BarChart3 size={11} className="text-accent" />
            <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">Tu progreso</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-text">{stats.sessionsPlayed}</p>
              <p className="text-[10px] text-text-muted">Sesiones</p>
            </div>
            <div>
              <p className="text-lg font-bold text-accent">{Math.round(stats.avgAccuracy * 100)}%</p>
              <p className="text-[10px] text-text-muted">Precisión</p>
            </div>
            <div>
              <p className="text-lg font-bold text-move-book">{Math.round(stats.bestAccuracy * 100)}%</p>
              <p className="text-[10px] text-text-muted">Mejor</p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-5 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
        {/* Description */}
        <div>
          <h4 className="text-[11px] font-semibold text-accent uppercase tracking-wider mb-1.5">Concepto</h4>
          <p className="text-sm text-text-dim leading-relaxed">{opening.description}</p>
        </div>

        {/* Pawn structure */}
        <div>
          <h4 className="text-[11px] font-semibold text-accent uppercase tracking-wider mb-1.5">Estructura de peones</h4>
          <p className="text-sm text-text-dim leading-relaxed">{opening.pawnStructure}</p>
        </div>

        {/* Main line */}
        <div>
          <h4 className="text-[11px] font-semibold text-accent uppercase tracking-wider mb-1.5">Línea principal</h4>
          <p className="text-sm font-mono text-text bg-surface rounded-lg px-3 py-2">
            {formatMainLine(opening.mainLine)}
          </p>
        </div>

        {/* Key ideas */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-eval-white border border-text-muted/30" />
              <span className="text-text-dim">Blancas</span>
            </h4>
            <ul className="space-y-1">
              {opening.keyIdeas.white.map((idea, i) => (
                <li key={i} className="text-xs text-text-dim leading-relaxed flex gap-1.5">
                  <span className="text-text-muted shrink-0">•</span>
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-eval-black border border-text-muted/50" />
              <span className="text-text-dim">Negras</span>
            </h4>
            <ul className="space-y-1">
              {opening.keyIdeas.black.map((idea, i) => (
                <li key={i} className="text-xs text-text-dim leading-relaxed flex gap-1.5">
                  <span className="text-text-muted shrink-0">•</span>
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Variations */}
        {opening.variations.length > 0 && (
          <div>
            <h4 className="text-[11px] font-semibold text-accent uppercase tracking-wider mb-1.5">Variantes principales</h4>
            <div className="space-y-1">
              {opening.variations.map((v, i) => (
                <div key={i} className="text-xs text-text-dim flex items-baseline gap-2">
                  <span className="text-move-book font-medium shrink-0">{v.name}</span>
                  <span className="font-mono text-text-muted">{v.moves.join(' ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Start button */}
      <div className="px-5 py-4 border-t border-surface-light/50">
        <button
          onClick={() => onStart(opening)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors text-sm"
        >
          <Swords size={16} />
          Empezar a entrenar
        </button>
      </div>
    </div>
  )
}

function formatMainLine(moves) {
  const parts = []
  for (let i = 0; i < moves.length; i++) {
    if (i % 2 === 0) parts.push(`${Math.floor(i / 2) + 1}.`)
    parts.push(moves[i])
  }
  return parts.join(' ')
}
