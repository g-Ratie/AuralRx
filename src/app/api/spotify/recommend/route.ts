import {
  RecommendationParamsWithSeedGenres,
  RecommendationParamsWithSeedTracks,
  extendedRecommendationSchema,
} from '@/common/LLM/recommendOutputSchema'
import { createSpotifyClient } from '@/common/Spotify/spotifyClient'
import { getSpotifyAccessToken } from '@/common/auth/Spotify/getAccessToken'
import { Image, SpotifyApi, Track } from '@spotify/web-api-ts-sdk'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export type RecommendationSongList = {
  id: string
  name: string
  uri: string
  albumImages: Image[]
}[]

export const recommendationSongSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    uri: z.string(),
    albumImages: z.array(
      z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
      }),
    ),
  })
  .array()

async function getRecommendationsBasedOnGenres(
  spotifyClient: SpotifyApi,
  recommendationParams: RecommendationParamsWithSeedGenres,
) {
  const { seedGenres, targetEnergy, targetInstrumentalness, targetValence } = recommendationParams
  const recommendations = await spotifyClient.recommendations.get({
    seed_genres: seedGenres,
    target_energy: targetEnergy,
    target_instrumentalness: targetInstrumentalness,
    target_valence: targetValence,
    limit: 10,
  })
  return recommendations
}

async function getRecommendationsBasedOnTracks(
  spotifyClient: SpotifyApi,
  recommendationParams: RecommendationParamsWithSeedTracks,
) {
  const { seedTracks, targetEnergy, targetInstrumentalness, targetValence } = recommendationParams
  const recommendations = await spotifyClient.recommendations.get({
    seed_tracks: seedTracks,
    target_energy: targetEnergy,
    target_instrumentalness: targetInstrumentalness,
    target_valence: targetValence,
    limit: 10,
  })
  return recommendations
}

export async function POST(req: NextRequest) {
  const spotifyAccessToken = await getSpotifyAccessToken()
  if (spotifyAccessToken === undefined) {
    return NextResponse.json({ error: 'No access token' }, { status: 401 })
  }
  const spotifyClient = await createSpotifyClient()

  const json = await req.json()

  try {
    const arraySchema = z.array(extendedRecommendationSchema)
    const validationResult = arraySchema.safeParse(json)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input format, expected an array of recommendation parameters.' },
        { status: 400 },
      )
    }
    const recommendations = await Promise.all(
      validationResult.data.map(async (recommendation) => {
        if ('seedGenres' in recommendation) {
          return getRecommendationsBasedOnGenres(spotifyClient, recommendation)
        }
        if ('seedTracks' in recommendation) {
          return getRecommendationsBasedOnTracks(spotifyClient, recommendation)
        }
        {
          throw new Error('Invalid recommendation parameters.')
        }
      }),
    )
    const res = recommendations.map((recommendation) => {
      return recommendation.tracks
    })
    const selectedTracks: Track[] = []
    const trackIds = new Set<string>()

    for (const subArray of res) {
      const track = subArray.find((track) => !trackIds.has(track.id))
      if (track) {
        selectedTracks.push(track)
        trackIds.add(track.id)
      }
    }

    return NextResponse.json({ selectedTracks })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 })
  }
}
