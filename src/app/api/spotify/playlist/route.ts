import { createSpotifyClient } from '@/common/Spotify/spotifyClient'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const spotifyClient = await createSpotifyClient()
  const playlists = await spotifyClient.currentUser.playlists.playlists()
  return NextResponse.json({ playlists: playlists.items }, { status: 200 })
}
