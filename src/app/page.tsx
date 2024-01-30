import Link from 'next/link'
import styles from './page.module.css'

export default async function Home() {
  return (
    <main className={styles.main}>
      <p>Hello, Hackathon</p>
      {/* 開発時用仮置リンク */}
      <Link href="/auth/spotify">Spotify</Link>
      <Link href="/auth/google">Google</Link>
    </main>
  )
}
