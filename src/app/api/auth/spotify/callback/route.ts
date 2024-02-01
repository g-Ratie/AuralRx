import { SpotifySession, spotifySessionOptions } from '@/common/auth/ironSessionConfig'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { spotifyAuthorize } from '../../../../../common/auth/Spotify/authorize'

export const GET = async (req: NextRequest) => {
  const authCode = req.nextUrl.searchParams.get('code')
  if (authCode === null)
    return NextResponse.json({ error: 'No auth code provided' }, { status: 400 })

  const response = await spotifyAuthorize(authCode)

  const session = await getIronSession<SpotifySession>(cookies(), spotifySessionOptions)
  session.accessToken = response.access_token
  session.refreshToken = response.refresh_token
  session.expiresAt = Date.now() + response.expires_in * 1000
  await session.save()

  return NextResponse.redirect('http://localhost:3000/')
}
