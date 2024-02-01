// 予め定義されたスキーマやAPIエンドポイントを使用
import { PostFitnessAPIRequestBody } from '@/app/api/fitness/route'
import { FitnessOutput, fitnessOutputSchema } from '../common/LLM/fitnessOutputSchema'
import { extendedRecommendationSchema } from '../common/LLM/recommendOutputSchema'

// フィットネスデータを取得する非同期関数
export async function fetchFitnessData() {
  try {
    const response = await fetch('http://localhost:3000/api/fitness', { method: 'GET' })
    const responseData = await response.json()
    const parsedFitnessData = fitnessOutputSchema.parse(responseData)
    return parsedFitnessData
  } catch (error) {
    return null
  }
}

// 推奨データを取得する非同期関数
export async function fetchRecommendedData(fitnessData: FitnessOutput, seedTrack: string[] | null) {
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

export async function fetchFitnessDataWithMock() {
  try {
    const response = await fetch('http://localhost:3000/api/fitness/mock', { method: 'GET' })
    const responseData = await response.json()
    const parsedFitnessData = fitnessOutputSchema.parse(responseData)
    return parsedFitnessData
  } catch (error) {
    return null
  }
}

// 推奨データを取得する非同期関数
export async function fetchRecommendedDataWithMock(
  fitnessData: FitnessOutput,
  seedTrack: string[] | null,
) {
  try {
    const requestBody: PostFitnessAPIRequestBody = {
      activityAnalysis: fitnessData.activityAnalysis,
      seedTrack: seedTrack,
    }
    const response = await fetch('http://localhost:3000/api/fitness/mock', {
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