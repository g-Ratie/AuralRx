import { IconBrandGithubFilled } from '@tabler/icons-react'
import Link from 'next/link'
import styles from './Header.module.css'

export const Header = async () => {
  return (
    <header className={styles.container}>
      <Link className={styles.logo} href="/">
        <img src="/logo.png" alt="AuralRx logo" />
      </Link>
      <Link href="https://github.com/iniad-ts/caravan-tokyo" className={styles.github}>
        <IconBrandGithubFilled size={28} color="#444" />
      </Link>
    </header>
  )
}
