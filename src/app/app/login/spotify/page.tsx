import { getSpotifyAccessToken } from '@/common/auth/Spotify/getAccessToken'
import { SpotifyLoginButton } from '@/components/auth/SpotifyLoginButton'
import { IllustMusic } from '@/components/illustration/IllustMusic'
import { redirect } from 'next/navigation'
import styles from '../login.module.css'

const Home = async () => {
  const spotifyToken = await getSpotifyAccessToken()
  if (spotifyToken !== undefined) return redirect('/app')

  return (
    <div className={styles.container}>
      <IllustMusic style={{ alignSelf: 'center' }} />
      <h1>Spotify連携</h1>
      <p>音楽再生やプレイリスト作成のためにSpotifyにログインしてください。</p>
      <SpotifyLoginButton />
    </div>
  )
}

export default Home
