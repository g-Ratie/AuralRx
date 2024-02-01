import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@/common/envValues'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { SpotifySession, spotifySessionOptions } from '../ironSessionConfig'
import { SpotifyAuthResponse, spotifyAuthResponseScheme } from './authResponseScheme'

const tokenEndpoint = 'https://accounts.spotify.com/api/token'

export const getSpotifyAccessToken = async () => {
  const session = await getIronSession<SpotifySession>(cookies(), spotifySessionOptions)
  if (session.expiresAt > Date.now()) return session.accessToken

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: session.refreshToken,
  })
  const buffer = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`, 'utf-8')
  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${buffer.toString('base64')}`,
  })

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    body: params,
    headers,
  })

  const data = await response.json()
  const parsed: SpotifyAuthResponse = spotifyAuthResponseScheme.parse(data)

  session.accessToken = parsed.access_token
  session.expiresAt = Date.now() + parsed.expires_in * 1000
  await session.save()

  return session.accessToken
}
