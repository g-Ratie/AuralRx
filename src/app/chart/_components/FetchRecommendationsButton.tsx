'use client'

import { RecommendationSongList } from '@/app/api/spotify/recommend/route'
import { FitnessOutput } from '@/common/LLM/fitnessOutputSchema'
import { Button } from '@/components/ui/Button'
import { fetchRecommendedDataWithMock } from '@/utils/fetchAPIData'

type Props = {
  fitnessData: FitnessOutput
  onRecommendationsFetched: (recommendSongData: RecommendationSongList) => void
}

export const FetchRecommendationsButton = ({ fitnessData, onRecommendationsFetched }: Props) => {
  const handleClick = async () => {
    const params = await fetchRecommendedDataWithMock(fitnessData, null)
    const res = await fetch('/api/spotify/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    }).catch((error) => {
      console.error('Error fetching recommended data:', error)
    })

    if (!res) return
    const data = await res.json()
    onRecommendationsFetched(data)
  }

  return <Button onClick={handleClick} label="レコメンドを取得" />
}
