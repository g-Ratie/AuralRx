import { chatUtils } from '@/common/LLM/chatUtils'
import { fitnessOutputSchema } from '@/common/LLM/fitnessOutputSchema'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const analyzeResult = await chatUtils.analyzeHealthDataWithMock()
  return NextResponse.json(analyzeResult)
}

export async function POST(req: NextRequest) {
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

    return NextResponse.json(recommendParams)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 })
  }
}
