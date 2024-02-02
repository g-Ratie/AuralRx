import { addTracksToPlayList, createPlayList } from '@/common/Spotify/playList'
import { createSpotifyClient } from '@/common/Spotify/spotifyClient'
import { getSpotifyCurrentUserId } from '@/common/Spotify/user'
import { getSpotifyAccessToken } from '@/common/auth/Spotify/getAccessToken'
import dayjs from 'dayjs'
import { NextRequest } from 'next/dist/server/web/spec-extension/request'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const ImageSchema = z.object({
  url: z.string(),
  height: z.number(),
  width: z.number(),
})

const RecommendationSongListSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    uri: z.string(),
    albumImages: z.array(ImageSchema),
  }),
)

export async function POST(req: NextRequest) {
  const spotifyAccessToken = await getSpotifyAccessToken()
  if (spotifyAccessToken === undefined) {
    return NextResponse.json({ error: 'No access token' }, { status: 401 })
  }
  const spotifyClient = await createSpotifyClient()
  const spotifyUserId = await getSpotifyCurrentUserId(spotifyClient)
  const today = dayjs().format('YYYY-MM-DD')

  const json = await req.json()

  try {
    const parsedJson = RecommendationSongListSchema.parse(json)
    const trackUris = parsedJson.map((item) => item.uri)
    const playlist = await createPlayList(
      spotifyClient,
      spotifyUserId,
      today,
      `${today}のアクティビティを音楽で振り返る #AuralRx`,
      false,
      false,
    )
    addTracksToPlayList(spotifyClient, playlist.id, trackUris)
    return NextResponse.json({ playlistId: playlist.id })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create playlist' }, { status: 500 })
  }
}
