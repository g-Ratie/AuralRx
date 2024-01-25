import { z } from 'zod'

const SPOTIFY_CLIENT_ID = z.string().parse(process.env.SPOTIFY_CLIENT_ID)
const SPOTIFY_CLIENT_SECRET = z.string().parse(process.env.SPOTIFY_CLIENT_SECRET)
const GEMINI_API_KEY = z.string().startsWith('AI').parse(process.env.GEMINI_API_KEY)
const CHATGPT_API_KEY = z.string().parse(process.env.CHATGPT_API_KEY)
const CHATGPT_ENDPOINT = z.string().url().parse(process.env.CHATGPT_ENDPOINT)
const GOOGLEFIT_CLIENT_ID = z
  .string()
  .endsWith('apps.googleusercontent.com')
  .parse(process.env.GOOGLEFIT_CLIENT_ID)
const GOOGLEFIT_CLIENT_SECRET = z.string().parse(process.env.GOOGLEFIT_CLIENT_SECRET)
const REDIRECT_URI = z.string().url().parse(process.env.REDIRECT_URI)

export {
  CHATGPT_API_KEY,
  CHATGPT_ENDPOINT,
  GEMINI_API_KEY,
  GOOGLEFIT_CLIENT_ID,
  GOOGLEFIT_CLIENT_SECRET,
  REDIRECT_URI,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
}
