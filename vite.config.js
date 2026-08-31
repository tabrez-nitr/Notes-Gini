import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { GoogleGenAI } from '@google/genai'

function apiDevMiddleware(env) {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/generate' && req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })
          req.on('end', async () => {
            try {
              const { prompt } = JSON.parse(body || '{}')
              if (!prompt) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify({ error: 'Prompt is required' }))
              }

              const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY
              if (!apiKey) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not set in .env' }))
              }

              const ai = new GoogleGenAI({ apiKey })
              const result = await ai.models.generateContent({
                model: 'gemini-3.1-flash-lite',
                contents: prompt,
              })

              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({ text: result.text.trim() }))
            } catch (err) {
              console.error('Dev server Gemini error:', err)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({ error: err.message || 'Failed to generate content' }))
            }
          })
        } else {
          next()
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tailwindcss(),
      apiDevMiddleware(env),
    ],
  }
})

