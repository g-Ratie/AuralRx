import { recomendSongParameter } from '@/common/LLM/chatUtils'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const res = NextResponse.json(await recomendSongParameter())
  return res
}
