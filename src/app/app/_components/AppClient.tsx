'use client'

import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk'
import { useState } from 'react'
import { FitnessGraph } from './FitnessGraph'
import { SelectPlayList } from './SelectPlayList'

export const AppClient = () => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<SimplifiedPlaylist['id'] | 'liked'>()

  const handleSelect = (id: SimplifiedPlaylist['id'] | 'liked') => {
    setSelectedPlaylistId(id)
  }

  return (
    <div>
      <h2>フィットネスデータ取得</h2>
      <p>Google Fitからフィットネスデータを取得します。</p>
      <FitnessGraph />
      <h2>プレイリストを選択</h2>
      <p>既存のプレイリストをもとに曲をレコメンドします。</p>
      <SelectPlayList selectedId={selectedPlaylistId} handleSelect={handleSelect} />
    </div>
  )
}
