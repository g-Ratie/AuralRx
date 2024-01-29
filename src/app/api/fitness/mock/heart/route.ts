import { getMockHeartRate } from '@/common/fitness/googleFitMock'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const res = NextResponse.json(await getMockHeartRate())
  return res
}
