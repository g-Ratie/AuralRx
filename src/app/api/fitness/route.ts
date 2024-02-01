import { chatUtils } from '@/common/LLM/chatUtils'
import { FitnessOutput, fitnessOutputSchema } from '@/common/LLM/fitnessOutputSchema'
import { ExtendedRecommendationParams } from '@/common/LLM/recommendOutputSchema'
import { getGoogleAccessToken } from '@/common/auth/Google/getAccessToken'
import { NextRequest, NextResponse } from 'next/server'

export type FitnessAPIResponse = {
  analyzeResult?: FitnessOutput
  recommendParams?: ExtendedRecommendationParams[]
}

export async function handleGet(req: NextRequest): Promise<NextResponse> {
  const googleAccessToken = await getGoogleAccessToken()
  if (googleAccessToken === undefined) {
    return NextResponse.json({ error: 'No access token' }, { status: 401 })
  }

  try {
    const analyzeResult = await chatUtils.analyzeHealthData(googleAccessToken)
    return NextResponse.json({ analyzeResult })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to analyze health data' }, { status: 500 })
  }
}

export async function handlePost(req: NextRequest): Promise<NextResponse> {
  const json = await req.json()
  const parsedJson = fitnessOutputSchema.parse(json)

  try {
    const recommendParams = await Promise.all(
      parsedJson.activityAnalysis.map(async (activity) => {
        const seedTrack = json.seedTrack && json.seedTrack.length > 0 ? json.seedTrack[0] : null // シードトラックの存在を確認
        const recommendResult = await chatUtils.recommendSongParameter(
          JSON.stringify(activity.activity_inference),
          seedTrack,
        )
        return recommendResult
      }),
    )

    return NextResponse.json({ recommendParams })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 })
  }
}

// Next.jsのAPIルートでこれらの関数を適切にエクスポートする
export function GET(req: NextRequest) {
  return handleGet(req)
}

export function POST(req: NextRequest) {
  return handlePost(req)
}
