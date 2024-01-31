import { chatUtils } from '@/common/LLM/chatUtils'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const analyzeResult = await chatUtils.analyzeHealthData()
  const recommendParams = await Promise.all(
    analyzeResult.activity_analysis.map(async (activity) => {
      const recommendResult = await chatUtils.recommendSongParameter(
        JSON.stringify(activity.activity_inference),
        null,
      )
      return recommendResult
    }),
  )

  const res = NextResponse.json({ analyzeResult, recommendParams: recommendParams })
  return res
}
