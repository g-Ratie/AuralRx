import { getProviders } from 'next-auth/react'
import { LoginButton } from '../../_components/LoginButton'
import styles from './Login.module.css'

export const Login = async () => {
  const provider = await getProviders()
  return (
    <div className={styles.container}>
      <p>Google連携</p>
      {provider?.google && <LoginButton loginProvider={provider.google} />}
    </div>
  )
}
