'use client'
import { FitnessOutput } from '@/common/LLM/fitnessOutputSchema'
import { fetchRecommendedDataWithMock } from '@/utils/fetchAPIData'

export default function FetchDataButton({ fitnessData }: { fitnessData: FitnessOutput }) {
  const handleClick = async () => {
    try {
      const recommendedData = await fetchRecommendedDataWithMock(fitnessData, null)
      console.log('Recommended Data:', recommendedData)
    } catch (error) {
      console.error('Error fetching recommended data:', error)
    }
  }

  return (
    // biome-ignore lint/a11y/useButtonType: <explanation>
    <button onClick={handleClick}>Fetch recommended data</button>
  )
}
