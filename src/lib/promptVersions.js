/**
 * Prompt versions for A/B testing LLM analysis quality.
 * Each version has a system prompt and optional few-shot examples.
 * The `id` is sent to the server to select the right system prompt.
 */
export const PROMPT_VERSIONS = [
  {
    id: 'v1',
    name: 'Base',
    description: 'Prompt directo sin ejemplos',
  },
  {
    id: 'v2',
    name: 'Few-shot',
    description: 'Con ejemplos modelo por fase',
  },
]

export const DEFAULT_VERSION = 'v1'
