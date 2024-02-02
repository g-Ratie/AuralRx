'use client'

import { RecommendationSongList } from '@/app/api/spotify/recommend/route'
import { Button } from '@/components/ui/Button'

type Props = {
  recommendSongData: RecommendationSongList
}

export const CreatePlaylistButton = ({ recommendSongData }: Props) => {
  const handleClick = () => {
    fetch('/api/spotify/playlist/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recommendSongData),
    }).catch((error) => {
      console.error('Error creating playlist:', error)
    })
  }

  return <Button onClick={handleClick} label="プレイリストを作成" />
}
