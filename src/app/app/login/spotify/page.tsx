import { getSpotifyAccessToken } from '@/common/auth/Spotify/getAccessToken'
import { SpotifyLoginButton } from '@/components/auth/SpotifyLoginButton'
import { redirect } from 'next/navigation'

const Home = async () => {
  const spotifyToken = await getSpotifyAccessToken()
  if (spotifyToken !== undefined) return redirect('/app')

  return (
    <div>
      <h1>Spotify連携</h1>
      <p>音楽再生やプレイリスト作成のためにSpotifyにログインしてください。</p>
      <SpotifyLoginButton />
    </div>
  )
}

export default Home
