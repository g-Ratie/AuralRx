import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from '@/common/envValues'
import { generateRandomString } from '@/utils/randomString'
import { NextResponse } from 'next/server'

const scope = [
  'playlist-modify-public',
  'playlist-modify-private',
  'user-read-playback-state',
  'user-modify-playback-state',
]

export const GET = async () => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope: scope.join(' '),
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state: generateRandomString(16),
  })

  const url = `https://accounts.spotify.com/authorize?${params}`

  return NextResponse.redirect(url)
}
