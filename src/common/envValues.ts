import { z } from 'zod'

const BASE_URL = z.string().url().parse(process.env.BASE_URL)
const SPOTIFY_CLIENT_ID = z.string().parse(process.env.SPOTIFY_CLIENT_ID)
const SPOTIFY_CLIENT_SECRET = z.string().parse(process.env.SPOTIFY_CLIENT_SECRET)
const SPOTIFY_REDIRECT_URI = z.string().url().parse(process.env.SPOTIFY_REDIRECT_URI)
const GEMINI_API_KEY = z.string().startsWith('AI').parse(process.env.GEMINI_API_KEY)
const CHATGPT_API_KEY = z.string().parse(process.env.CHATGPT_API_KEY)
const CHATGPT_ENDPOINT = z.string().url().parse(process.env.CHATGPT_ENDPOINT)
const GOOGLEFIT_CLIENT_ID = z
  .string()
  .endsWith('apps.googleusercontent.com')
  .parse(process.env.GOOGLEFIT_CLIENT_ID)
const GOOGLEFIT_CLIENT_SECRET = z.string().parse(process.env.GOOGLEFIT_CLIENT_SECRET)
const GOOGLEFIT_REDIRECT_URI = z.string().url().parse(process.env.GOOGLEFIT_REDIRECT_URI)
const IRON_SESSION_PASSWORD = z.string().min(32).parse(process.env.IRON_SESSION_PASSWORD)

export {
  BASE_URL,
  CHATGPT_API_KEY,
  CHATGPT_ENDPOINT,
  GEMINI_API_KEY,
  GOOGLEFIT_CLIENT_ID,
  GOOGLEFIT_CLIENT_SECRET,
  GOOGLEFIT_REDIRECT_URI,
  IRON_SESSION_PASSWORD,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
}
