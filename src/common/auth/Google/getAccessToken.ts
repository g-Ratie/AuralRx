import {
  GOOGLEFIT_CLIENT_ID,
  GOOGLEFIT_CLIENT_SECRET,
  GOOGLEFIT_REDIRECT_URI,
} from '@/common/envValues'
import { google } from 'googleapis'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { GoogleSession, googleSessionOptions } from '../ironSessionConfig'

export const getGoogleAccessToken = async () => {
  const session = await getIronSession<GoogleSession>(cookies(), googleSessionOptions)
  if (session.expiresAt ?? 0 > Date.now()) return session.accessToken

  const googleApiClient = new google.auth.OAuth2(
    GOOGLEFIT_CLIENT_ID,
    GOOGLEFIT_CLIENT_SECRET,
    GOOGLEFIT_REDIRECT_URI,
  )
  const { credentials } = await googleApiClient.refreshAccessToken()

  session.accessToken = credentials.access_token ?? undefined
  session.expiresAt = credentials.expiry_date ?? undefined
  await session.save()

  return session.accessToken
}
