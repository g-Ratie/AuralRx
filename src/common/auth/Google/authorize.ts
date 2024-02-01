import {
  GOOGLEFIT_CLIENT_ID,
  GOOGLEFIT_CLIENT_SECRET,
  GOOGLEFIT_REDIRECT_URI,
} from '@/common/envValues'
import { google } from 'googleapis'

export const googleAuthorize = async (code: string) => {
  const googleApiClient = new google.auth.OAuth2(
    GOOGLEFIT_CLIENT_ID,
    GOOGLEFIT_CLIENT_SECRET,
    GOOGLEFIT_REDIRECT_URI,
  )
  const { tokens } = await googleApiClient.getToken(code)
  googleApiClient.setCredentials(tokens)

  return tokens
}
