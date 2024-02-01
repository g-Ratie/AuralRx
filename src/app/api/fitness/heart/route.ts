import { getGoogleAccessToken } from '@/common/auth/Google/getAccessToken'
import { getHeartRate } from '@/common/fitness/googleFitService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const googleAccessToken = await getGoogleAccessToken()
  if (googleAccessToken === undefined) {
    return NextResponse.json({ error: 'No access token' }, { status: 401 })
  }
  const res = NextResponse.json(await getHeartRate(googleAccessToken))
  return res
}
