import { authOptions } from '@/service/nextAuthConfig'
import { getServerSession } from 'next-auth'
import { getProviders } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { LoginButton } from '../_components/LoginButton'
import styles from './page.module.css'

const Home = async () => {
  const session = await getServerSession(authOptions)

  if (session?.provider === 'spotify') return redirect('/')

  const provider = await getProviders()

  return (
    <div className={styles.container}>
      <p>Spotify連携</p>
      {provider?.spotify && <LoginButton loginProvider={provider.spotify} />}
    </div>
  )
}

export default Home
