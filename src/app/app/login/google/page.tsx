import { getGoogleAccessToken } from '@/common/auth/Google/getAccessToken'
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton'
import { IllustFitness } from '@/components/illustration/IllustFitness'
import { redirect } from 'next/navigation'
import styles from '../login.module.css'

const Home = async () => {
  const googleToken = await getGoogleAccessToken()
  if (googleToken !== undefined) return redirect('/app/login/spotify')

  return (
    <div className={styles.container}>
      <IllustFitness style={{ alignSelf: 'center' }} />
      <h1>GoogleFit連携</h1>
      <p>ヘルスケアデータ取得のためにGoogleにログインしてください</p>
      <GoogleLoginButton />
    </div>
  )
}

export default Home
