'use client'

import { PlaylistCard } from '@/components/music/PlaylistCard'
import { Button } from '@/components/ui/Button'
import { Loading } from '@/components/ui/Loading'
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk'
import { IconMusicPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './SelectPlayList.module.css'

type Props = {
  selectedId?: SimplifiedPlaylist['id']
  handleSelect: (id: SimplifiedPlaylist['id']) => void
}

export const SelectPlayList = ({ selectedId, handleSelect }: Props) => {
  const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/spotify/playlist')
      .then((res) => res.json())
      .then((data) => setPlaylists(data.playlists))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loading visible={loading} />
  }

  return playlists.length === 0 ? (
    <div className={styles.noPlaylist}>
      <p>プレイリストが見つかりませんでした。</p>
      <Link href="/app/playlist/create">
        <Button
          Icon={IconMusicPlus}
          label="プレイリストを作成"
          style={{ backgroundColor: '#eee' }}
        />
      </Link>
    </div>
  ) : (
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
