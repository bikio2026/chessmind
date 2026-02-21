import { useState, useRef, useEffect } from 'react'
import { Brain, ChevronDown, Sparkles, Zap, Power } from 'lucide-react'

const CLAUDE_DISPLAY = {
  'claude-haiku-4-5-20251001': { name: 'Haiku 4.5', badge: 'rápido' },
  'claude-sonnet-4-20250514': { name: 'Sonnet 4', badge: 'equilibrado' },
  'claude-sonnet-4-5-20250929': { name: 'Sonnet 4.5', badge: 'preciso' },
}

const GROQ_DISPLAY = {
  'llama-3.3-70b-versatile': { name: 'Llama 3.3 70B', badge: 'rápido' },
  'llama-3.1-8b-instant': { name: 'Llama 3.1 8B', badge: 'ultra rápido' },
}

function shortModelName(model) {
  if (!model) return ''
  return model.replace(/:latest$/, '')
}

const PROVIDER_ICONS = {
  ollama: Brain,
  groq: Zap,
  claude: Sparkles,
}

export function LLMSelector({ provider, model, providerStatus, enabled, isProduction, onChange, onToggle }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const currentDisplay = provider === 'claude'
    ? (CLAUDE_DISPLAY[model]?.name || 'Claude')
    : provider === 'groq'
      ? (GROQ_DISPLAY[model]?.name || 'Groq')
      : (shortModelName(model) || 'Ollama')

  const Icon = PROVIDER_ICONS[provider] || Brain

  return (
    <div className="relative" ref={ref}>
      <div className="flex items-center rounded-lg overflow-hidden">
        <button
          onClick={onToggle}
          className={`flex items-center gap-1 px-2 py-1.5 text-sm transition-colors border-r border-surface/30 ${
            enabled
              ? 'bg-accent/20 text-accent hover:bg-accent/30'
              : 'bg-surface-alt text-text-dim hover:text-text hover:bg-surface-light'
          }`}
          title={enabled ? 'Desactivar LLM' : 'Activar LLM'}
        >
          <Power size={14} />
        </button>

        <button
          onClick={() => setOpen(prev => !prev)}
          className={`flex items-center gap-1 px-2 py-1.5 text-sm transition-colors ${
            enabled
              ? 'bg-accent/20 text-accent hover:bg-accent/30'
              : 'bg-surface-alt text-text-dim hover:text-text hover:bg-surface-light'
          }`}
        >
          <Icon size={14} />
          <span className="hidden sm:inline text-xs font-medium">{currentDisplay}</span>
          <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-surface-alt border border-surface-light rounded-lg shadow-xl z-50 py-1">
          {/* Ollama section — hidden in production */}
          {!isProduction && (
            <>
              <div className="px-3 py-1.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                <Brain size={10} />
                Ollama (local)
                {providerStatus.ollama === false && (
                  <span className="ml-auto text-[9px] text-move-bad font-normal normal-case">offline</span>
                )}
              </div>
              {providerStatus.ollamaModels.length > 0 ? (
                providerStatus.ollamaModels.map(m => {
                  const name = shortModelName(m)
                  const isSelected = provider === 'ollama' && (model === m || model === name || (!model && m.startsWith('llama')))
                  return (
                    <button
                      key={m}
                      onClick={() => { onChange('ollama', m); setOpen(false) }}
                      disabled={!providerStatus.ollama}
                      className={`w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                        isSelected ? 'bg-accent/10 text-accent' : 'text-text-dim hover:bg-surface-light hover:text-text'
                      }`}
                    >
                      <span className="flex-1 truncate">{name}</span>
                      <span className="text-[10px] text-text-muted">gratis</span>
                    </button>
                  )
                })
              ) : (
                <div className="px-3 py-1.5 text-xs text-text-muted italic">
                  {providerStatus.ollama === null ? 'Verificando...' : 'No hay modelos'}
                </div>
              )}
              <div className="border-t border-surface-light my-1" />
            </>
          )}

          {/* Groq section */}
          <div className="px-3 py-1.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
            <Zap size={10} />
            Groq (cloud)
            {providerStatus.groq === false && (
              <span className="ml-auto text-[9px] text-text-muted font-normal normal-case">sin API key</span>
            )}
          </div>
          {Object.entries(GROQ_DISPLAY).map(([id, info]) => {
            const isSelected = provider === 'groq' && model === id
            return (
              <button
                key={id}
                onClick={() => { onChange('groq', id); setOpen(false) }}
                disabled={!providerStatus.groq}
                className={`w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  isSelected ? 'bg-accent/10 text-accent' : 'text-text-dim hover:bg-surface-light hover:text-text'
                }`}
              >
                <span className="flex-1">{info.name}</span>
                <span className="text-[10px] text-text-muted">{info.badge}</span>
              </button>
            )
          })}

          <div className="border-t border-surface-light my-1" />

          {/* Claude section */}
          <div className="px-3 py-1.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={10} />
            Claude (API)
            {providerStatus.claude === false && (
              <span className="ml-auto text-[9px] text-text-muted font-normal normal-case">sin créditos</span>
            )}
          </div>
          {Object.entries(CLAUDE_DISPLAY).map(([id, info]) => {
            const isSelected = provider === 'claude' && model === id
            return (
              <button
                key={id}
                onClick={() => { onChange('claude', id); setOpen(false) }}
                disabled={!providerStatus.claude}
                className={`w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  isSelected ? 'bg-accent/10 text-accent' : 'text-text-dim hover:bg-surface-light hover:text-text'
                }`}
              >
                <span className="flex-1">{info.name}</span>
                <span className="text-[10px] text-text-muted">{info.badge}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
