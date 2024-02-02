import { getGoogleAccessToken } from '@/common/auth/Google/getAccessToken'
import { getSpotifyAccessToken } from '@/common/auth/Spotify/getAccessToken'
import { redirect } from 'next/navigation'

const Home = async () => {
  const googleToken = await getGoogleAccessToken()
  if (googleToken === undefined) redirect('/app/login/google')
  const spotifyToken = await getSpotifyAccessToken()
  if (spotifyToken === undefined) redirect('/app/login/spotify')

  return <div>app</div>
}

export default Home
