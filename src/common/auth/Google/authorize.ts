import { GOOGLEFIT_CLIENT_ID, GOOGLEFIT_CLIENT_SECRET } from '@/common/envValues'
import { google } from 'googleapis'

const redirect_uri = 'http://localhost:3000/api/auth/google/callback'

export const googleAuthorize = async (code: string) => {
  const googleApiClient = new google.auth.OAuth2(
    GOOGLEFIT_CLIENT_ID,
    GOOGLEFIT_CLIENT_SECRET,
    redirect_uri,
  )
  const { tokens } = await googleApiClient.getToken(code)
  googleApiClient.setCredentials(tokens)

  return tokens
}
