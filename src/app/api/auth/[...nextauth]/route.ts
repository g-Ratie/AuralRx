import {
  GOOGLEFIT_CLIENT_ID,
  GOOGLEFIT_CLIENT_SECRET,
  NEXTAUTH_SECRET,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from '@/service/envValues'
import { generateScopes } from '@/utils/generateScopes'
import NextAuth from 'next-auth/next'
import Google from 'next-auth/providers/google'
import Spotify from 'next-auth/providers/spotify'

const googleScopes = ['fitness.activity.read', 'fitness.location.read']
const spotifyScopes = ['playlist-modify-public', 'playlist-modify-private']

const handler = NextAuth({
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
          scope: generateScopes(googleScopes, 'https://www.googleapis.com/auth/'),
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
})

export { handler as GET, handler as POST }
