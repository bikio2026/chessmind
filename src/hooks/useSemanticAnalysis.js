import { useState, useRef, useCallback } from 'react'

export function useSemanticAnalysis() {
  const [narrative, setNarrative] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState(null)
  const [providerStatus, setProviderStatus] = useState({
    ollama: null,   // null = not checked, true/false
    claude: null,
    groq: null,
    ollamaModels: [],
    claudeModels: [],
    groqModels: [],
  })
  const abortRef = useRef(null)
  const debounceRef = useRef(null)
  const cacheRef = useRef(new Map())

  const checkHealth = useCallback(async () => {
    try {
      const res = await fetch('/api/health')
      const data = await res.json()
      const status = {
        ollama: data.ollama?.available ?? false,
        claude: data.claude?.available ?? false,
        groq: data.groq?.available ?? false,
        ollamaModels: data.ollama?.models ?? [],
        claudeModels: data.claude?.models ?? [],
        groqModels: data.groq?.models ?? [],
      }
      setProviderStatus(status)
      return status
    } catch {
      const status = { ollama: false, claude: false, groq: false, ollamaModels: [], claudeModels: [], groqModels: [] }
      setProviderStatus(status)
      return status
    }
  }, [])

  const analyze = useCallback((prompt, fen, provider = 'ollama', model, promptVersion = 'v1') => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      // Cache key includes provider to avoid mixing results
      const cacheKey = `${provider}:${promptVersion}:${fen}`

      if (cacheRef.current.has(cacheKey)) {
        setNarrative(cacheRef.current.get(cacheKey))
        return
      }

      if (abortRef.current) abortRef.current.abort()
      const controller = new AbortController()
      abortRef.current = controller

      setIsAnalyzing(true)
      setError(null)
      setNarrative('')

      try {
        const endpoints = { ollama: '/api/analyze', claude: '/api/analyze-claude', groq: '/api/analyze-groq' }
        const endpoint = endpoints[provider] || '/api/analyze'
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, model, promptVersion }),
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
              if (json.done) {
                cacheRef.current.set(cacheKey, fullText)
                if (cacheRef.current.size > 100) {
                  const firstKey = cacheRef.current.keys().next().value
                  cacheRef.current.delete(firstKey)
                }
              }
            } catch { /* skip malformed */ }
          }
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Error en el análisis. Se reintentará con la próxima jugada.')
        }
      } finally {
        setIsAnalyzing(false)
      }
    }, 2000)
  }, [])

  const clearNarrative = useCallback(() => {
    setNarrative('')
    setError(null)
  }, [])

  const startOllama = useCallback(async () => {
    setError(null)
    try {
      const res = await fetch('/api/start-ollama', { method: 'POST' })
      const data = await res.json()
      if (data.status === 'started' || data.status === 'already_running') {
        setProviderStatus(prev => ({ ...prev, ollama: true }))
        return true
      } else {
        setError(data.message || 'No se pudo iniciar Ollama')
        return false
      }
    } catch {
      setError('No se pudo conectar con el servidor')
      return false
    }
  }, [])

  return {
    narrative,
    isAnalyzing,
    error,
    providerStatus,
    analyze,
    checkHealth,
    clearNarrative,
    startOllama,
  }
}
