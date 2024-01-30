'use client'

import { TablerIconsProps } from '@tabler/icons-react'
import { CSSProperties, FC } from 'react'
import styles from './Button.module.css'

type Props = {
  Icon?: FC<TablerIconsProps>
  label: string
  style?: CSSProperties
  onClick?: () => void
}

export const Button = ({ Icon, label, style, onClick }: Props) => {
  return (
    <button style={style} onClick={onClick} type="button" className={styles.button}>
      {Icon !== undefined && <Icon size={28} />}
      {label}
    </button>
  )
}
