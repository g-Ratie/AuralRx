'use client'

import styles from './Title.module.css'

type Props = {
  title: string
  number: `${number}`
}

export const Title = ({ title, number }: Props) => {
  return (
    <h2 className={styles.title}>
      <span className={styles.number}>{number}</span>
      <span className={styles.text}>{title}</span>
    </h2>
  )
}
