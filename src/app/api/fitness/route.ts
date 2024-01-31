import { chatUtils } from '@/common/LLM/chatUtils'
import { getGoogleAccessToken } from '@/service/getGoogleAccessToken'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const googleAccessToken = await getGoogleAccessToken()
  if (googleAccessToken === null) {
    return NextResponse.json({ error: 'No access token' }, { status: 401 })
  }
  const searchparams = req.nextUrl.searchParams
  const seedTrack = searchparams.get('seedTrack')
  try {
    const analyzeResult = await chatUtils.analyzeHealthData(googleAccessToken)
    const recommendParams = await Promise.all(
      //TODO: どこかでseedTrackが実在するかSpotifyAPIで検証したい
      analyzeResult.activity_analysis.map(async (activity) => {
        const recommendResult = await chatUtils.recommendSongParameter(
          JSON.stringify(activity.activity_inference),
          seedTrack,
        )
        return recommendResult
      }),
    )
    return NextResponse.json({ analyzeResult, recommendParams: recommendParams })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to analyze health data' }, { status: 500 })
  }
}
