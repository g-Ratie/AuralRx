import { RecommendationSongList } from '@/app/api/spotify/recommend/route'
import { Button } from '@/components/ui/Button'
import React from 'react'

type CreatePlaylistButtonProps = {
  recommendSongData: RecommendationSongList
}

const CreatePlaylistButton: React.FC<CreatePlaylistButtonProps> = ({ recommendSongData }) => {
  const handleClick = async () => {
    if (!recommendSongData) {
      console.error('No recommend song data available')
      return
    }

    try {
      await fetch('/api/spotify/playlist/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recommendSongData),
      })
    } catch (error) {
      console.error('Error creating playlist:', error)
    }
  }

  return <Button onClick={handleClick} label="プレイリストを作成" />
}

export default CreatePlaylistButton
