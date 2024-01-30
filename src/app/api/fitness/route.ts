import { getFitnessData } from '@/common/fitness/googleFitService'
import { getGoogleAccessToken } from '@/service/getGoogleAccessToken'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const googleAccessToken = await getGoogleAccessToken()
  if (googleAccessToken === null) {
    return NextResponse.json({ error: 'No access token' }, { status: 401 })
  }

  const res = NextResponse.json(await getFitnessData(googleAccessToken))
  return res
}
