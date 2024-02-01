import { IllustFitness } from '@/components/illustration/IllustFitness'
import { IllustMusic } from '@/components/illustration/IllustMusic'
import { StartButton } from './_components/StartButton'
import styles from './page.module.css'

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.illusts}>
        <IllustMusic />
        <IllustFitness />
      </div>
      <h1 className={styles.logo}>
        <img src="/logo.png" alt="AuralRx Logo" />
      </h1>
      <p className={styles.description}>
        <span>ヘルスケア</span>
        <span>✕</span>
        <span>AI</span>
        <span>✕</span>
        <span>ミュージックテクノロジー</span>
      </p>
      <StartButton />
    </main>
  )
}
