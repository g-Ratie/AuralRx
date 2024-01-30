import { getServerSession } from 'next-auth'
import { authOptions } from './nextAuthConfig'

export const getGoogleAccessToken = async () => {
  const session = await getServerSession(authOptions)
  if (session?.provider === 'google') {
    return session.user.accessToken ?? null
  }
  return null
}
