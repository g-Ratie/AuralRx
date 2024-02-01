import { googleAuthorize } from '@/common/auth/Google/authorize'
import { GoogleSession, googleSessionOptions } from '@/common/auth/ironSessionConfig'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const authCode = req.nextUrl.searchParams.get('code')
  if (authCode === null)
    return NextResponse.json({ error: 'No auth code provided' }, { status: 400 })

  const response = await googleAuthorize(authCode)
  const session = await getIronSession<GoogleSession>(cookies(), googleSessionOptions)
  session.accessToken = response.access_token ?? undefined
  session.refreshToken = response.refresh_token ?? undefined
  session.expiresAt = response.expiry_date ?? undefined
  await session.save()

  return NextResponse.redirect('http://localhost:3000/')
}
