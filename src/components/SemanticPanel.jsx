import { useState } from 'react'
import { Brain, Sparkles, Zap, RefreshCw, Loader2, AlertCircle, Play } from 'lucide-react'

const MODEL_DISPLAY = {
  'claude-haiku-4-5-20251001': 'Haiku 4.5',
  'claude-sonnet-4-20250514': 'Sonnet 4',
  'claude-sonnet-4-5-20250929': 'Sonnet 4.5',
  'llama-3.3-70b-versatile': 'Llama 3.3 70B',
  'llama-3.1-8b-instant': 'Llama 3.1 8B',
}

function modelBadge(provider, model) {
  if (provider === 'claude') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] bg-purple-500/15 text-purple-400 px-1.5 py-0.5 rounded-full font-medium">
        <Sparkles size={9} />
        {MODEL_DISPLAY[model] || 'Claude'}
      </span>
    )
  }
  if (provider === 'groq') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] bg-amber-500/15 text-amber-400 px-1.5 py-0.5 rounded-full font-medium">
        <Zap size={9} />
        {MODEL_DISPLAY[model] || 'Groq'}
      </span>
    )
  }
  const name = model ? model.replace(/:latest$/, '') : 'Ollama'
  return (
    <span className="inline-flex items-center gap-1 text-[10px] bg-accent/15 text-accent px-1.5 py-0.5 rounded-full font-medium">
      <Brain size={9} />
      {name}
    </span>
  )
}

export function SemanticPanel({
  narrative, isAnalyzing, error,
  providerStatus, llmProvider, llmModel,
  semanticEnabled, onRefresh, onStartOllama,
}) {
  const [starting, setStarting] = useState(false)

  const isAvailable = llmProvider === 'claude'
    ? providerStatus.claude
    : providerStatus.ollama

  const isChecking = llmProvider === 'claude'
    ? providerStatus.claude === null
    : providerStatus.ollama === null

  async function handleStartOllama() {
    setStarting(true)
    try {
      await onStartOllama()
    } finally {
      setStarting(false)
    }
  }

  // Disabled state
  if (!semanticEnabled) {
    return (
      <div className="bg-surface-alt rounded-lg p-3 opacity-60">
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
          <Brain size={14} />
          Análisis Semántico
          <span className="ml-auto text-text-muted font-normal normal-case text-xs">desactivado</span>
        </h2>
      </div>
    )
  }

  // Provider not available
  if (isAvailable === false) {
    return (
      <div className="bg-surface-alt rounded-lg p-4">
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Brain size={14} />
          Análisis Semántico
          {modelBadge(llmProvider, llmModel)}
        </h2>
        <div className="flex items-start gap-2 text-sm">
          <AlertCircle size={16} className="text-yellow-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            {llmProvider === 'ollama' ? (
              <>
                <p className="text-yellow-400">Ollama no disponible</p>
                <p className="text-text-muted mt-1">
                  Necesitás Ollama corriendo con un modelo instalado (ej:{' '}
                  <code className="bg-surface px-1.5 py-0.5 rounded text-xs">llama3.2</code>)
                </p>
              </>
            ) : llmProvider === 'groq' ? (
              <>
                <p className="text-yellow-400">Groq no disponible</p>
                <p className="text-text-muted mt-1">
                  Configurá{' '}
                  <code className="bg-surface px-1.5 py-0.5 rounded text-xs">GROQ_API_KEY</code>
                  {' '}en{' '}
                  <code className="bg-surface px-1.5 py-0.5 rounded text-xs">.env</code>
                  {' '}— obtené una gratis en{' '}
                  <a href="https://console.groq.com/keys" target="_blank" rel="noopener" className="text-accent hover:underline">console.groq.com</a>
                </p>
              </>
            ) : (
              <>
                <p className="text-yellow-400">Claude API no disponible</p>
                <p className="text-text-muted mt-1">
                  Configurá{' '}
                  <code className="bg-surface px-1.5 py-0.5 rounded text-xs">ANTHROPIC_API_KEY</code>
                  {' '}en el archivo{' '}
                  <code className="bg-surface px-1.5 py-0.5 rounded text-xs">.env</code>
                  {' '}y reiniciá el server.
                </p>
              </>
            )}
            <div className="flex items-center gap-2 mt-3">
              {llmProvider === 'ollama' && onStartOllama && (
                <button
                  onClick={handleStartOllama}
                  disabled={starting}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors text-xs font-medium disabled:opacity-50"
                >
                  {starting ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      Iniciando...
                    </>
                  ) : (
                    <>
                      <Play size={12} />
                      Iniciar Ollama
                    </>
                  )}
                </button>
              )}
              <button
                onClick={onRefresh}
                className="flex items-center gap-1 text-xs text-text-muted hover:text-text transition-colors"
              >
                <RefreshCw size={12} />
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Normal active state
  return (
    <div className="bg-surface-alt rounded-lg p-4">
      <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <Brain size={14} />
        Análisis Semántico
        {modelBadge(llmProvider, llmModel)}
        {isAnalyzing && <Loader2 size={12} className="animate-spin text-accent" />}
        {narrative && !isAnalyzing && (
          <button
            onClick={onRefresh}
            className="ml-auto p-1 hover:bg-surface-light rounded transition-colors"
            title="Re-analizar"
          >
            <RefreshCw size={12} className="text-text-muted" />
          </button>
        )}
      </h2>

      {error && (
        <p className="text-move-bad text-sm mb-2">{error}</p>
      )}

      {!narrative && !isAnalyzing && !error && (
        <p className="text-text-muted text-sm italic">
          {isChecking ? 'Verificando conexión...' : 'Mové una pieza para iniciar el análisis semántico'}
        </p>
      )}

      {(narrative || isAnalyzing) && (
        <div className="text-sm text-text leading-relaxed whitespace-pre-wrap">
          {narrative}
          {isAnalyzing && !narrative && (
            <span className="text-text-muted italic">Pensando...</span>
          )}
          {isAnalyzing && narrative && (
            <span className="animate-pulse-soft">▊</span>
          )}
        </div>
      )}
    </div>
  )
}
