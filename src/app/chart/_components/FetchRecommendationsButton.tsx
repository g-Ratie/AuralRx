import { RecommendationSongList } from '@/app/api/spotify/recommend/route'
import { FitnessOutput } from '@/common/LLM/fitnessOutputSchema'
import { Button } from '@/components/ui/Button'
import { fetchRecommendedDataWithMock } from '@/utils/fetchAPIData'
import React from 'react'

type FetchRecommendationsButtonProps = {
  fitnessData: FitnessOutput
  onRecommendationsFetched: (recommendSongData: RecommendationSongList) => void
}

const FetchRecommendationsButton: React.FC<FetchRecommendationsButtonProps> = ({
  fitnessData,
  onRecommendationsFetched,
}) => {
  const handleClick = async () => {
    try {
      const recommendedParams = await fetchRecommendedDataWithMock(fitnessData, null)
      const recommendSongResponse = await fetch('/api/spotify/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recommendedParams),
      })
      const recommendSongData = await recommendSongResponse.json()
      onRecommendationsFetched(recommendSongData)
    } catch (error) {
      console.error('Error fetching recommended data:', error)
    }
  }

  return <Button onClick={handleClick} label="レコメンドを取得" />
}

export default FetchRecommendationsButton
