'use client'

import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk'
import { KeyboardEvent } from 'react'
import styles from './PlaylistCard.module.css'

type Props = {
  playlist: SimplifiedPlaylist
  onSelect: (id: SimplifiedPlaylist['id']) => void
  isSelected?: boolean
}

export const PlaylistCard = ({ playlist, onSelect, isSelected = false }: Props) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onSelect(playlist.id)
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
      onClick={() => onSelect(playlist.id)}
      onKeyDown={handleKeyDown}
    >
      <img className={styles.image} src={playlist.images[0].url} alt={playlist.name} />
      <h3 className={styles.title}>{playlist.name}</h3>
      <p className={styles.description}>{playlist.description}</p>
    </div>
  )
}
