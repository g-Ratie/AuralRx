import { countingHourlyAverage } from '@/common/fitness/aggregateFitnessData'
import { getHeartRate } from '@/common/fitness/googleFitService'
import { getaccessToken } from '@/service/checkAccesstoken'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const accessTokenOrError = await getaccessToken()
  if (accessTokenOrError instanceof NextResponse) {
    return accessTokenOrError
  }
  const hr = await getHeartRate(accessTokenOrError)
  if (hr === null) {
    return NextResponse.json({ message: 'no data' })
  }
  const res = NextResponse.json({ res: await countingHourlyAverage(hr) })
  return res
}
