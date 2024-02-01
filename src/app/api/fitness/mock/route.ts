import { chatUtils } from '@/common/LLM/chatUtils'
import { FitnessOutput, fitnessOutputSchema } from '@/common/LLM/fitnessOutputSchema'
import { ExtendedRecommendationParams } from '@/common/LLM/recommendOutputSchema'
import { NextRequest, NextResponse } from 'next/server'

export type PostFitnessAPIResponse = {
  recommendParams: ExtendedRecommendationParams[]
}

export type PostFitnessAPIRequestBody = {
  activityAnalysis: FitnessOutput['activityAnalysis']
  seedTrack: string[] | null
}

async function handleGet(req: NextRequest): Promise<NextResponse> {
  const analyzeResult = await chatUtils.analyzeHealthDataWithMock()
  return NextResponse.json(analyzeResult)
}

async function handlePost(req: NextRequest): Promise<NextResponse> {
  const json = await req.json()
  const parsedJson = fitnessOutputSchema.parse(json.activityAnalysis)

  const recommendParams = await Promise.all(
    parsedJson.activityAnalysis.map(async (activity) => {
      const seedTrack = json.seedTrack && json.seedTrack.length > 0 ? json.seedTrack[0] : null
      const recommendResult = await chatUtils.recommendSongParameter(
        JSON.stringify(activity.activity_inference),
        seedTrack,
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
