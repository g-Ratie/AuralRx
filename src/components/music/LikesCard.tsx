'use client'

import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk'
import { IconMusicHeart } from '@tabler/icons-react'
import { KeyboardEvent } from 'react'
import styles from './LikesCard.module.css'

type Props = {
  onSelect: (id: SimplifiedPlaylist['id'] | 'liked') => void
  isSelected?: boolean
}

export const LikesCard = ({ isSelected, onSelect }: Props) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onSelect('liked')
    }
    if (e.key === 'Escape') {
      e.currentTarget.blur()
    }
  }
  return (
    <div
      // biome-ignore lint/a11y/noNoninteractiveTabindex: This div is interactive
      tabIndex={0}
      className={`${styles.container} ${isSelected ? styles.active : ''}`}
      onClick={() => onSelect('liked')}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.icon}>
        <IconMusicHeart size={48} />
      </div>
      <h3 className={styles.title}>お気に入り</h3>
      <p className={styles.description}>お気に入りの曲を使用</p>
    </div>
  )
}
