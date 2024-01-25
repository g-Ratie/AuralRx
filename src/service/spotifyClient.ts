import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from './envValues'

export const spotifyClient = SpotifyApi.withClientCredentials(
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
)
