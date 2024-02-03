'use client'
import { RecommendationSongList } from '@/app/api/spotify/recommend/route'
import CreatePlaylistButton from '@/app/chart/_components/CreatePlaylistButton'
import FetchRecommendationsButton from '@/app/chart/_components/FetchRecommendationsButton'
import { FitnessOutput, fitnessOutputSchema } from '@/common/LLM/fitnessOutputSchema'
import { useEffect, useState } from 'react'

const PlayClient = () => {
  const [fitnessData, setFitnessData] = useState<FitnessOutput | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [recommendSongData, setRecommendSongData] = useState<RecommendationSongList | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/fitness/mock', { method: 'GET' })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const responseData = await response.json()
        const parsedFitnessData = fitnessOutputSchema.parse(responseData)
        setFitnessData(parsedFitnessData)
      } catch (error) {
        console.error('Error loading fitness data:', error)
        setFitnessData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div>
        <p>読み込み中...</p>
      </div>
    )
  }

  if (!fitnessData) {
    return (
      <div>
        <p>データがありません</p>
      </div>
    )
  }
  return (
    <div>
      <FetchRecommendationsButton
        fitnessData={fitnessData}
        onRecommendationsFetched={setRecommendSongData}
      />
      {recommendSongData && <CreatePlaylistButton recommendSongData={recommendSongData} />}
    </div>
  )
}

export default PlayClient
