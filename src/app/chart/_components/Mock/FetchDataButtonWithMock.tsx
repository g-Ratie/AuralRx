'use client'
import { FitnessOutput } from '@/common/LLM/fitnessOutputSchema'
import { Button } from '@/components/ui/Button'
import { fetchRecommendedDataWithMock } from '@/utils/fetchAPIData'

const FetchDataButtonWithMock = ({ fitnessData }: { fitnessData: FitnessOutput }) => {
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
      console.log('recommendSongData:', recommendSongData)

      await fetch('/api/spotify/playlist/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recommendSongData),
      })
    } catch (error) {
      console.error('Error fetching recommended data:', error)
    }
  }

  return <Button onClick={handleClick} label="レコメンドを取得(モック)" />
}

export default FetchDataButtonWithMock
