import { getGoogleAccessToken } from '@/common/auth/Google/getAccessToken'
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton'
import { redirect } from 'next/navigation'

const Home = async () => {
  const googleToken = await getGoogleAccessToken()
  if (googleToken !== undefined) return redirect('/app/login/spotify')

  return (
    <div>
      <h1>GoogleFit連携</h1>
      <p>ヘルスケアデータ取得のためにGoogleにログインしてください</p>
      <GoogleLoginButton />
    </div>
  )
}

export default Home
