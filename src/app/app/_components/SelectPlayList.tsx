'use client'

import { PlaylistCard } from '@/components/music/PlaylistCard'
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk'
import { useEffect, useState } from 'react'
import styles from './SelectPlayList.module.css'

type Props = {
  selectedId?: SimplifiedPlaylist['id']
  handleSelect: (id: SimplifiedPlaylist['id']) => void
}

export const SelectPlayList = ({ selectedId, handleSelect }: Props) => {
  const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>([])

  useEffect(() => {
    fetch('/api/spotify/playlist')
      .then((res) => res.json())
      .then((data) => setPlaylists(data.playlists))
  }, [])

  return (
    <div className={styles.container}>
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          playlist={playlist}
          onSelect={handleSelect}
          isSelected={selectedId === playlist.id}
        />
      ))}
    </div>
  )
}
