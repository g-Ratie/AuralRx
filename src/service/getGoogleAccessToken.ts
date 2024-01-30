import { getServerSession } from 'next-auth'
import { authOptions } from './nextAuthConfig'

export const getGoogleAccessToken = async () => {
  const session = await getServerSession(authOptions)
  if (session?.provider !== 'google') {
    return null
  }
  if (!session) {
    return null
  }
  if (!session.user.accessToken) {
    return null
  }
  return session.user.accessToken
}
