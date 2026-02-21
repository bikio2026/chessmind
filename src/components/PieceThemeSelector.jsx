import { useState, useRef, useEffect } from 'react'
import { THEMES, THEME_NAMES } from '../lib/pieceThemes.jsx'
import { Palette, ChevronDown } from 'lucide-react'

export function PieceThemeSelector({ currentTheme, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-alt rounded-lg text-text-dim hover:text-text hover:bg-surface-light transition-colors text-sm"
      >
        <Palette size={14} />
        <span className="hidden sm:inline">{THEMES[currentTheme]?.name || 'Tema'}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-surface-alt border border-surface-light rounded-lg shadow-lg overflow-hidden z-50 min-w-[180px]">
          {THEME_NAMES.map(key => (
            <button
              key={key}
              onClick={() => { onChange(key); setOpen(false) }}
              className={`w-full text-left px-3 py-2.5 text-sm hover:bg-surface-light transition-colors flex items-center gap-2 ${
                currentTheme === key ? 'bg-accent/10 text-accent' : 'text-text-dim'
              }`}
            >
              <span className="flex-1">
                <span className="font-medium block">{THEMES[key].name}</span>
                <span className="text-[11px] text-text-muted">{THEMES[key].description}</span>
              </span>
              {currentTheme === key && (
                <span className="text-accent text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
