import { authOptions } from '@/service/nextAuthConfig'
import { getServerSession } from 'next-auth'
import { getProviders } from 'next-auth/react'
import { LoginButton } from '../_components/LoginButton'
import { Fitness } from './_components/Fitness'
import styles from './page.module.css'

const Home = async () => {
  const provider = await getProviders()
  const session = await getServerSession(authOptions)
  const isAuthorizedByGoogle = session?.provider === 'google'

  return (
    <div className={styles.container}>
      {isAuthorizedByGoogle ? (
        <Fitness />
      ) : (
        <>
          <p>Google連携</p>
          {provider?.google && <LoginButton loginProvider={provider.google} />}
        </>
      )}
    </div>
  )
}

export default Home
