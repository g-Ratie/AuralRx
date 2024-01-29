import { RecommendationsRequest, SpotifyApi } from '@spotify/web-api-ts-sdk'

export const getRecommendations = async (
  spotifyClient: SpotifyApi,
  seed_genres: RecommendationsRequest['seed_genres'],
  seed_tracks: RecommendationsRequest['seed_tracks'],
  target_energy: RecommendationsRequest['target_energy'],
  target_instrumentalness: RecommendationsRequest['target_instrumentalness'],
  target_valence: RecommendationsRequest['target_valence'],
) => {
  const recommendations = await spotifyClient.recommendations.get({
    seed_genres,
    seed_tracks,
    target_energy,
    target_instrumentalness,
    target_valence,
  })
  return recommendations
}

export const getGenreSeeds = async (spotifyClient: SpotifyApi) => {
  return await spotifyClient.recommendations.genreSeeds()
}
