import {
  GOOGLEFIT_CLIENT_ID,
  GOOGLEFIT_CLIENT_SECRET,
  NEXTAUTH_SECRET,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from '@/service/envValues'
import NextAuth from 'next-auth/next'
import Google from 'next-auth/providers/google'
import Spotify from 'next-auth/providers/spotify'

const handler = NextAuth({
  secret: NEXTAUTH_SECRET,
  debug: true,
  providers: [
    Google({
      clientId: GOOGLEFIT_CLIENT_ID,
      clientSecret: GOOGLEFIT_CLIENT_SECRET,
    }),
    Spotify({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
    }),
  ],
})

export { handler as GET, handler as POST }
