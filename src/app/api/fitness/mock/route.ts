import { chatUtils } from '@/common/LLM/chatUtils'
import { FitnessOutput, fitnessOutputSchema } from '@/common/LLM/fitnessOutputSchema'
import { ExtendedRecommendationParams } from '@/common/LLM/recommendOutputSchema'
import { NextRequest, NextResponse } from 'next/server'

// POSTリクエストのレスポンス型
export type PostFitnessAPIResponse = {
  recommendParams: ExtendedRecommendationParams[]
}

//POSTリクエストのリクエストボディ型
export type PostFitnessAPIRequestBody = {
  activity_analysis: FitnessOutput['activity_analysis']
  seedTrack: string[]
}

async function handleGet(req: NextRequest): Promise<NextResponse> {
  const analyzeResult = await chatUtils.analyzeHealthDataWithMock()
  return NextResponse.json(analyzeResult)
}

async function handlePost(req: NextRequest): Promise<NextResponse> {
  const json = await req.json()
  const parsed = fitnessOutputSchema.parse(json)

  const recommendParams = await Promise.all(
    parsed.activity_analysis.map(async (activity) => {
      const recommendResult = await chatUtils.recommendSongParameter(
        JSON.stringify(activity.activity_inference),
        null,
      )
      return recommendResult
    }),
  )

  const response: PostFitnessAPIResponse = { recommendParams }
  return NextResponse.json(response)
}

export function GET(req: NextRequest) {
  return handleGet(req)
}

export function POST(req: NextRequest) {
  return handlePost(req)
}
