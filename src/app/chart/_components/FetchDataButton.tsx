'use client'
import { PostFitnessAPIRequestBody } from '@/app/api/fitness/route'
import { FitnessOutput } from '@/common/LLM/fitnessOutputSchema'
import { extendedRecommendationSchema } from '@/common/LLM/recommendOutputSchema'
import { Button } from '@/components/ui/Button'
import { fetchRecommendedDataWithMock } from '@/utils/fetchAPIData'

export default function FetchDataButton({ fitnessData }: { fitnessData: FitnessOutput }) {
  async function fetchRecommendedData(fitnessData: FitnessOutput, seedTrack: string[] | null) {
    try {
      const requestBody: PostFitnessAPIRequestBody = {
        activityAnalysis: fitnessData.activityAnalysis,
        seedTrack: seedTrack,
      }
      const response = await fetch('http://localhost:3000/api/fitness', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const responseData = await response.json()
      const parsedRecommendedData = responseData.map((item: unknown) =>
        extendedRecommendationSchema.parse(item),
      )
      return parsedRecommendedData
    } catch (error) {
      return null
    }
  }
  const handleClick = async () => {
    try {
      const recommendedData = await fetchRecommendedData(fitnessData, null)
      console.log('Recommended Data:', recommendedData)
    } catch (error) {
      console.error('Error fetching recommended data:', error)
    }
  }

  return <Button onClick={handleClick} label="レコメンドを取得" />
}
