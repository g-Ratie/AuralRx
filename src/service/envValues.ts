import * as v from 'valibot'

const SPOTIFY_CLIENT_ID = v.parse(v.string(), process.env.SPOTIFY_CLIENT_ID)
const SPOTIFY_CLIENT_SECRET = v.parse(v.string(), process.env.SPOTIFY_CLIENT_SECRET)
const GEMINI_API_KEY = v.parse(v.string([v.startsWith('AI')]), process.env.GEMINI_API_KEY)
const CHATGPT_API_KEY = v.parse(v.string(), process.env.CHATGPT_API_KEY)
const CHATGPT_ENDPOINT = v.parse(v.string([v.url()]), process.env.CHATGPT_ENDPOINT)
const GOOGLEFIT_CLIENT_ID = v.parse(
  v.string([v.endsWith('.apps.googleusercontent.com')]),
  process.env.GOOGLEFIT_CLIENT_ID,
)
const GOOGLEFIT_CLIENT_SECRET = v.parse(v.string(), process.env.GOOGLEFIT_CLIENT_SECRET)
const REDIRECT_URI = v.parse(v.string([v.url()]), process.env.REDIRECT_URI)

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
