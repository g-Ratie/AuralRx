'use client'

import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk'
import { IconMusicCode } from '@tabler/icons-react'
import { KeyboardEvent } from 'react'
import styles from './PlaylistCard.module.css'

const NoImage = () => {
  return (
    <div className={styles.noImage}>
      <IconMusicCode size={48} />
    </div>
  )
}

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
      {playlist.images.length > 0 ? (
        <img src={playlist.images[0].url} alt={playlist.name} className={styles.image} />
      ) : (
        <NoImage />
      )}
      <h3 className={styles.title}>{playlist.name}</h3>
      <p className={styles.description}>{playlist.description}</p>
    </div>
  )
}
