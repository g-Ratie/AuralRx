import { SpotifyApi } from '@spotify/web-api-ts-sdk'

export const getSpotifyCurrentUserId = async (spotifyClient: SpotifyApi) => {
  const user = await spotifyClient.currentUser.profile()
  return user.id
}
