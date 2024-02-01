import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@/common/envValues'
import { SpotifyAuthResponse, spotifyAuthResponseScheme } from './authResponseScheme'

const redirect_uri = 'http://localhost:3000/api/auth/spotify/callback'

export const spotifyAuthorize = async (code: string) => {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri,
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
