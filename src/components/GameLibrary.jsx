import { useState, useRef } from 'react'
import { X, Search, Upload, BookOpen, Globe, FileText, Filter, XCircle, Loader2, ChevronDown } from 'lucide-react'
import { useGameLibrary } from '../hooks/useGameLibrary'
import { ERAS, ECO_GROUPS } from '../lib/sampleGames'

const RESULT_OPTIONS = [
  { id: '1-0', label: '1-0', color: 'text-green-400' },
  { id: '0-1', label: '0-1', color: 'text-red-400' },
  { id: '1/2-1/2', label: '\u00bd-\u00bd', color: 'text-yellow-400' },
]

const YEAR_RANGES = [
  { id: '1850', label: '< 1900' },
  { id: '1900', label: '1900-1950' },
  { id: '1950', label: '1950-1975' },
  { id: '1975', label: '1975-2000' },
  { id: '2000', label: '2000+' },
]

const RATING_RANGES = [
  { id: '0', label: '< 2400' },
  { id: '2400', label: '2400-2600' },
  { id: '2600', label: '2600-2700' },
  { id: '2700', label: '2700+' },
]

function FilterDropdown({ label, options, value, onChange, icon: Icon }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] transition-colors ${
          value ? 'bg-accent/20 text-accent' : 'bg-surface text-text-dim hover:text-text'
        }`}
      >
        {Icon && <Icon size={11} />}
        {label}
        <ChevronDown size={10} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1 z-50 bg-surface-alt border border-surface-light rounded-lg shadow-lg py-1 min-w-[140px] animate-fadeIn">
            {value && (
              <button
                onClick={() => { onChange(null); setOpen(false) }}
                className="w-full text-left px-3 py-1.5 text-[11px] text-text-muted hover:bg-surface-light transition-colors"
              >
                Limpiar filtro
              </button>
            )}
            {options.map(opt => (
              <button
                key={opt.id}
                onClick={() => { onChange(opt.id); setOpen(false) }}
                className={`w-full text-left px-3 py-1.5 text-[11px] transition-colors ${
                  value === opt.id
                    ? 'bg-accent/15 text-accent'
                    : 'text-text-dim hover:text-text hover:bg-surface-light'
                } ${opt.color || ''}`}
              >
                {opt.label || opt.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function GameCard({ game, onClick }) {
  const resultColor = game.result === '1-0' ? 'text-green-400' : game.result === '0-1' ? 'text-red-400' : 'text-yellow-400'

  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-surface-light transition-colors group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="font-medium text-text truncate">{game.white || '?'}</span>
            <span className="text-text-muted">vs</span>
            <span className="font-medium text-text truncate">{game.black || '?'}</span>
            {game.year && <span className="text-text-muted text-xs">({game.year})</span>}
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-text-muted">
            {game.event && <span className="truncate">{game.event}</span>}
            {game.opening && <span className="truncate">{game.opening}</span>}
            {(game.whiteElo || game.blackElo) && (
              <span>{game.whiteElo || '?'}/{game.blackElo || '?'}</span>
            )}
          </div>
          {game.tags && game.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {game.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[9px] bg-surface px-1.5 py-0.5 rounded-full text-text-muted">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className={`text-xs font-mono font-bold shrink-0 ${resultColor}`}>
          {game.result || '*'}
        </span>
      </div>
    </button>
  )
}

function LichessGameCard({ game, onClick }) {
  const resultColor = game.result === '1-0' ? 'text-green-400' : game.result === '0-1' ? 'text-red-400' : 'text-yellow-400'

  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-surface-light transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="font-medium text-text truncate">{game.white || '?'}</span>
            <span className="text-text-muted">vs</span>
            <span className="font-medium text-text truncate">{game.black || '?'}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-text-muted">
            {game.opening && <span className="truncate">{game.opening}</span>}
            {game.speed && <span>{game.speed}</span>}
            {game.date && <span>{game.date}</span>}
          </div>
        </div>
        <span className={`text-xs font-mono font-bold shrink-0 ${resultColor}`}>
          {game.result || '*'}
        </span>
      </div>
    </button>
  )
}

export function GameLibrary({ isOpen, onClose, onLoad }) {
  const lib = useGameLibrary()
  const [pgnText, setPgnText] = useState('')
  const [error, setError] = useState(null)

  if (!isOpen) return null

  function handleGameLoad(pgn) {
    const success = onLoad(pgn)
    if (success) {
      setError(null)
      onClose()
    } else {
      setError('PGN inv\u00e1lido')
    }
  }

  function handleManualLoad() {
    if (!pgnText.trim()) {
      setError('Peg\u00e1 un PGN para cargar')
      return
    }
    const success = onLoad(pgnText.trim())
    if (success) {
      setPgnText('')
      setError(null)
      onClose()
    } else {
      setError('PGN inv\u00e1lido \u2014 verific\u00e1 el formato')
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

  function handleLichessSearch(e) {
    e.preventDefault()
    lib.searchLichess(lib.lichessQuery)
  }

  const hasActiveFilters = Object.values(lib.filters).some(v => v !== null)

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-surface-alt rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-surface-light shrink-0">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen size={20} />
            Biblioteca de Partidas
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-surface-light rounded transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-surface-light shrink-0">
          <button
            onClick={() => lib.setActiveTab('collection')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
              lib.activeTab === 'collection'
                ? 'border-accent text-accent'
                : 'border-transparent text-text-dim hover:text-text'
            }`}
          >
            <BookOpen size={14} />
            Colecci\u00f3n
          </button>
          <button
            onClick={() => lib.setActiveTab('lichess')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
              lib.activeTab === 'lichess'
                ? 'border-accent text-accent'
                : 'border-transparent text-text-dim hover:text-text'
            }`}
          >
            <Globe size={14} />
            Lichess
          </button>
          <button
            onClick={() => lib.setActiveTab('manual')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
              lib.activeTab === 'manual'
                ? 'border-accent text-accent'
                : 'border-transparent text-text-dim hover:text-text'
            }`}
          >
            <FileText size={14} />
            Manual
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden flex flex-col">

          {/* === COLLECTION TAB === */}
          {lib.activeTab === 'collection' && (
            <>
              {/* Search + Filters */}
              <div className="p-3 space-y-2 shrink-0 border-b border-surface-light/50">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    value={lib.searchQuery}
                    onChange={e => lib.setSearchQuery(e.target.value)}
                    placeholder="Buscar jugador, apertura, torneo..."
                    className="w-full pl-8 pr-3 py-2 bg-surface rounded-lg text-sm text-text border border-surface-light focus:border-accent focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Filter size={11} className="text-text-muted" />
                  <FilterDropdown
                    label="Era"
                    options={ERAS || []}
                    value={lib.filters.era}
                    onChange={v => lib.setFilter('era', v)}
                  />
                  <FilterDropdown
                    label="Resultado"
                    options={RESULT_OPTIONS}
                    value={lib.filters.result}
                    onChange={v => lib.setFilter('result', v)}
                  />
                  <FilterDropdown
                    label="Apertura"
                    options={(ECO_GROUPS || []).map(g => ({ ...g, label: g.name }))}
                    value={lib.filters.ecoGroup}
                    onChange={v => lib.setFilter('ecoGroup', v)}
                  />
                  <FilterDropdown
                    label="Rating"
                    options={RATING_RANGES}
                    value={lib.filters.ratingRange}
                    onChange={v => lib.setFilter('ratingRange', v)}
                  />
                  <FilterDropdown
                    label="A\u00f1o"
                    options={YEAR_RANGES}
                    value={lib.filters.yearRange}
                    onChange={v => lib.setFilter('yearRange', v)}
                  />
                  {hasActiveFilters && (
                    <button
                      onClick={lib.clearFilters}
                      className="flex items-center gap-0.5 px-2 py-1 rounded text-[11px] text-accent hover:bg-accent/10 transition-colors"
                    >
                      <XCircle size={11} />
                      Limpiar
                    </button>
                  )}
                </div>
              </div>

              {/* Game list */}
              <div className="flex-1 overflow-y-auto p-2">
                {lib.filteredGames.length === 0 ? (
                  <div className="text-center py-8 text-text-muted text-sm">
                    No se encontraron partidas con esos filtros
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    {lib.filteredGames.map((game, i) => (
                      <GameCard
                        key={game.id || i}
                        game={game}
                        onClick={() => handleGameLoad(game.pgn)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer count */}
              <div className="px-3 py-2 text-[11px] text-text-muted border-t border-surface-light/50 shrink-0">
                Mostrando {lib.filteredGames.length} de {lib.totalGames} partidas
              </div>
            </>
          )}

          {/* === LICHESS TAB === */}
          {lib.activeTab === 'lichess' && (
            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
              <form onSubmit={handleLichessSearch} className="space-y-2">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Buscar partidas de un jugador en Lichess
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={lib.lichessQuery}
                    onChange={e => lib.setLichessQuery(e.target.value)}
                    placeholder="Username de Lichess (ej: DrNykterstein)"
                    className="flex-1 px-3 py-2 bg-surface rounded-lg text-sm text-text border border-surface-light focus:border-accent focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={lib.lichessLoading || !lib.lichessQuery.trim()}
                    className="px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/80 transition-colors text-sm disabled:opacity-40"
                  >
                    {lib.lichessLoading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                  </button>
                </div>
              </form>

              {lib.lichessError && (
                <p className="text-red-400 text-sm">{lib.lichessError}</p>
              )}

              {lib.lichessResults.length > 0 && (
                <div className="space-y-0.5">
                  <p className="text-[11px] text-text-muted mb-1">
                    {lib.lichessResults.length} partidas encontradas
                  </p>
                  {lib.lichessResults.map((game, i) => (
                    <LichessGameCard
                      key={i}
                      game={game}
                      onClick={() => handleGameLoad(game.pgn)}
                    />
                  ))}
                </div>
              )}

              {!lib.lichessLoading && lib.lichessResults.length === 0 && !lib.lichessError && (
                <div className="text-center py-8 text-text-muted text-sm">
                  <Globe size={32} className="mx-auto mb-2 opacity-30" />
                  <p>Ingres\u00e1 un username de Lichess para buscar sus partidas</p>
                  <p className="text-[11px] mt-1">Trae las \u00faltimas 20 partidas cl\u00e1sicas/r\u00e1pidas rated</p>
                </div>
              )}
            </div>
          )}

          {/* === MANUAL TAB === */}
          {lib.activeTab === 'manual' && (
            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
              <div>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                  Pegar PGN
                </h3>
                <textarea
                  value={pgnText}
                  onChange={e => { setPgnText(e.target.value); setError(null) }}
                  placeholder="1. e4 e5 2. Nf3 Nc6 ..."
                  className="w-full h-40 bg-surface rounded-lg p-3 text-sm font-mono text-text resize-none border border-surface-light focus:border-accent focus:outline-none"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex gap-2">
                <button
                  onClick={handleManualLoad}
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
          )}
        </div>
      </div>
    </div>
  )
}
