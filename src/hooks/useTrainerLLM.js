import { useState, useRef, useCallback } from 'react'

/**
 * Lightweight LLM hook for the Opening Trainer.
 * Uses the same API endpoints as the analyzer but with 'trainer' system prompt.
 * Reads provider/model from localStorage (shared settings).
 * If provider is 'ollama' (local only), falls back to claude.
 */
export function useTrainerLLM() {
  const [narrative, setNarrative] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const analyze = useCallback(async (prompt) => {
    // Read shared provider/model settings
    let provider = localStorage.getItem('chessmind-llm-provider') || 'claude'
    let model = localStorage.getItem('chessmind-llm-model') || ''

    // Ollama isn't available in production — fall back to Claude Haiku
    if (provider === 'ollama') {
      provider = 'claude'
      model = 'claude-haiku-4-5-20251001'
    }

    // Ensure a model is always set (Haiku is fast + cheap for per-move feedback)
    if (provider === 'claude' && !model) {
      model = 'claude-haiku-4-5-20251001'
    }
    if (provider === 'groq' && !model) {
      model = 'llama-3.3-70b-versatile'
    }

    // Abort previous request
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setNarrative('')
    setIsAnalyzing(true)
    setError(null)

    try {
      const endpoint = provider === 'groq' ? '/api/analyze-groq' : '/api/analyze-claude'

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model, promptVersion: 'trainer' }),
        signal: controller.signal,
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || `Error del servidor (${res.status})`)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '))

        for (const line of lines) {
          try {
            const json = JSON.parse(line.slice(6))
            if (json.token) {
              fullText += json.token
              setNarrative(fullText)
            }
          } catch { /* skip malformed SSE lines */ }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Error en el análisis semántico')
      }
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  const clear = useCallback(() => {
    if (abortRef.current) abortRef.current.abort()
    setNarrative('')
    setError(null)
    setIsAnalyzing(false)
  }, [])

  return { narrative, isAnalyzing, error, analyze, clear }
}
