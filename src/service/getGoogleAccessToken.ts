import { getServerSession } from 'next-auth'
import { authOptions } from './nextAuthConfig'

export const getGoogleAccessToken = async () => {
  const session = await getServerSession(authOptions)
  return session && session.provider === 'google' && session.user.accessToken
    ? session.user.accessToken
    : null
}
