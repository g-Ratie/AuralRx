import {
  GoogleSession,
  SpotifySession,
  googleSessionOptions,
  spotifySessionOptions,
} from '@/common/auth/ironSessionConfig'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AppClient } from './_components/AppClient'

const Home = async () => {
  const googleSession = await getIronSession<GoogleSession>(cookies(), googleSessionOptions)
  if (googleSession.accessToken === undefined) redirect('/app/login/google')
  const spotifySession = await getIronSession<SpotifySession>(cookies(), spotifySessionOptions)
  if (spotifySession.accessToken === undefined) redirect('/app/login/spotify')

  return (
    <div>
      <AppClient />
    </div>
  )
}

export default Home
