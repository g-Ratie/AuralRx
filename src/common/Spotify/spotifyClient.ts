import { SPOTIFY_CLIENT_ID } from '@/service/envValues'
import { AccessToken, SpotifyApi } from '@spotify/web-api-ts-sdk'

export const createSpotifyClient = (accessToken: string, refreshToken: string): SpotifyApi => {
  const token: AccessToken = {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: 3600,
    token_type: 'Bearer',
  }

  return SpotifyApi.withAccessToken(SPOTIFY_CLIENT_ID, token)
}
