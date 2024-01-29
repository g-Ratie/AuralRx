import { generateScopes } from '@/utils/generateScopes'
import { DefaultSession, NextAuthOptions } from 'next-auth'
import Google from 'next-auth/providers/google'
import Spotify from 'next-auth/providers/spotify'
import {
  GOOGLEFIT_CLIENT_ID,
  GOOGLEFIT_CLIENT_SECRET,
  NEXTAUTH_SECRET,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from './envValues'

declare module 'next-auth' {
  interface User {
    accessToken: string | undefined
    refreshToken: string | undefined
  }
  interface Session extends DefaultSession {
    user: {
      accessToken: string | undefined
      refreshToken: string | undefined
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string | undefined
    refreshToken: string | undefined
  }
}

const googleScopes = [
  'userinfo.profile',
  'userinfo.email',
  'fitness.activity.read',
  'fitness.location.read',
]
const spotifyScopes = ['playlist-modify-public', 'playlist-modify-private']

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  debug: true,
  providers: [
    Google({
      clientId: GOOGLEFIT_CLIENT_ID,
      clientSecret: GOOGLEFIT_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: generateScopes(googleScopes, 'https://www.googleapis.com/auth/', true),
        },
      },
    }),
    Spotify({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope: generateScopes(spotifyScopes),
        },
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account?.provider === 'google') {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      if (account?.provider === 'spotify') {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    },
    session: async ({ session, token }) => {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      return session
    },
  },
}
