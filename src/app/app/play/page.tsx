import {
  GoogleSession,
  SpotifySession,
  googleSessionOptions,
  spotifySessionOptions,
} from '@/common/auth/ironSessionConfig'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PlayClient from './_components/Playclient'

type Params = {
  searchParams: {
    playlist: string | undefined
  }
}

const Home = async ({ searchParams }: Params) => {
  const googleSession = await getIronSession<GoogleSession>(cookies(), googleSessionOptions)
  if (googleSession.accessToken === undefined) redirect('/app/login/google')
  const spotifySession = await getIronSession<SpotifySession>(cookies(), spotifySessionOptions)
  if (spotifySession.accessToken === undefined) redirect('/app/login/spotify')

  const playlistId = searchParams.playlist
  if (!playlistId) return <main>Playlist not found</main>

  return <PlayClient />
}

export default Home
