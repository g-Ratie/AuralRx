import { PostFitnessAPIRequestBody } from '@/app/api/fitness/route'
import { FitnessOutput, fitnessOutputSchema } from '../common/LLM/fitnessOutputSchema'
import { extendedRecommendationSchema } from '../common/LLM/recommendOutputSchema'

export async function fetchFitnessDataWithMock() {
  try {
    const response = await fetch('/api/fitness/mock', { method: 'GET' })
    const responseData = await response.json()
    const parsedFitnessData = fitnessOutputSchema.parse(responseData)
    return parsedFitnessData
  } catch (error) {
    return null
  }
}

export async function fetchRecommendedDataWithMock(
  fitnessData: FitnessOutput,
  seedTrack: string[] | null,
) {
  try {
    const requestBody: PostFitnessAPIRequestBody = {
      activityAnalysis: fitnessData.activityAnalysis,
      seedTrack: seedTrack,
    }
    const response = await fetch('/api/fitness/mock', {
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
