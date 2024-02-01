import { chatUtils } from '@/common/LLM/chatUtils'
import { fitnessOutputSchema } from '@/common/LLM/fitnessOutputSchema'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const analyzeResult = await chatUtils.analyzeHealthDataWithMock()
  return NextResponse.json(analyzeResult)
}

export async function POST(req: NextRequest) {
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

  return NextResponse.json(recommendParams)
}
