import { SpotifyLoginButton } from '@/components/auth/SpotifyLoginButton'
import styles from './page.module.css'

export default async function Home() {
  return (
    <main className={styles.main}>
      <p>Hello, Hackathon</p>
      <SpotifyLoginButton />
    </main>
  )
}
