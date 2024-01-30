import { SpotifyApi, User } from '@spotify/web-api-ts-sdk'

export const createPlayList = async (
  spotifyClient: SpotifyApi,
  userId: User['id'],
  name: string,
  description: string,
  isPublic: boolean,
  isCollaborative: boolean,
) => {
  const playlist = await spotifyClient.playlists.createPlaylist(userId, {
    name,
    description,
    public: isPublic,
    collaborative: isCollaborative,
  })

  return playlist
}

export const addTracksToPlayList = async (
  spotifyClient: SpotifyApi,
  playlistId: string,
  trackUris: string[],
) => {
  return await spotifyClient.playlists.addItemsToPlaylist(playlistId, trackUris)
}
