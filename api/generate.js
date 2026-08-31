import { GoogleGenAI } from '@google/genai'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Handle both parsed body and stringified body if applicable
  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ error: 'Invalid JSON payload' })
    }
  }

  const { prompt } = body || {}
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server' })
  }

  try {
    const ai = new GoogleGenAI({ apiKey })
    const result = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
    })

    return res.status(200).json({ text: result.text.trim() })
  } catch (error) {
    console.error('Gemini API Error:', error)
    return res.status(500).json({ error: error.message || 'Failed to generate content' })
  }
}
