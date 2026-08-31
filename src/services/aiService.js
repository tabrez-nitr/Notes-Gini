/**
 * Service to call Gemini AI through the backend /api/generate endpoint.
 * This keeps the GEMINI_API_KEY secure on the server side.
 */
export async function generateGeminiContent(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Prompt is required')
  }

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || 'Failed to generate content')
  }

  return data.text
}
