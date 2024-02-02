import { SPOTIFY_CLIENT_ID } from '@/common/envValues'
import { AccessToken, SpotifyApi } from '@spotify/web-api-ts-sdk'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { SpotifySession, spotifySessionOptions } from '../auth/ironSessionConfig'

export const createSpotifyClient = async (): Promise<SpotifyApi> => {
  const session = await getIronSession<SpotifySession>(cookies(), spotifySessionOptions)
  return new Promise<SpotifyApi>((resolve, reject) => {
    try {
      const accessToken: AccessToken = {
        access_token: session.accessToken,
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: session.refreshToken,
      }
      const client = SpotifyApi.withAccessToken(SPOTIFY_CLIENT_ID, accessToken)
      resolve(client)
    } catch (error) {
      reject(error)
    }
  })
}
