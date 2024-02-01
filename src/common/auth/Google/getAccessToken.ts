import { GOOGLEFIT_CLIENT_ID, GOOGLEFIT_CLIENT_SECRET } from '@/common/envValues'
import { google } from 'googleapis'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { GoogleSession, googleSessionOptions } from '../ironSessionConfig'

const redirect_uri = 'http://localhost:3000/api/auth/google/callback'

export const getGoogleAccessToken = async () => {
  const session = await getIronSession<GoogleSession>(cookies(), googleSessionOptions)
  if (session.expiresAt ?? 0 > Date.now()) return session.accessToken

  const googleApiClient = new google.auth.OAuth2(
    GOOGLEFIT_CLIENT_ID,
    GOOGLEFIT_CLIENT_SECRET,
    redirect_uri,
  )
  const { credentials } = await googleApiClient.refreshAccessToken()

  session.accessToken = credentials.access_token ?? undefined
  session.expiresAt = credentials.expiry_date ?? undefined
  await session.save()

  return session.accessToken
}
