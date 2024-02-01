import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from '@/common/envValues'
import { SpotifyAuthResponse, spotifyAuthResponseScheme } from './authResponseScheme'

export const spotifyAuthorize = async (code: string) => {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    SPOTIFY_REDIRECT_URI,
  })
  const buffer = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`, 'utf-8')
  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${buffer.toString('base64')}`,
  })

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: params,
    headers,
  })

  const data = await response.json()
  console.log(data)
  const parsed: SpotifyAuthResponse = spotifyAuthResponseScheme.parse(data)
  return parsed
}
