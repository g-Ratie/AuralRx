'use client'
import { FitnessOutput } from '@/common/LLM/fitnessOutputSchema'
import { Button } from '@/components/ui/Button'
import { fetchRecommendedDataWithMock } from '@/utils/fetchAPIData'

export default function FetchDataButtonWithMock({ fitnessData }: { fitnessData: FitnessOutput }) {
  const handleClick = async () => {
    try {
      const recommendedData = await fetchRecommendedDataWithMock(fitnessData, null)
      console.log('Recommended Data:', recommendedData)
    } catch (error) {
      console.error('Error fetching recommended data:', error)
    }
  }

  return <Button onClick={handleClick} label="レコメンドを取得" />
}
