import { recommendSongParameter } from '@/common/LLM/chatUtils'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchparams = req.nextUrl.searchParams
  const input = searchparams.get('input')
  const seedTrack = searchparams.get('seedTrack')
  if (input === null) {
    return NextResponse.json({ error: 'input is null' }, { status: 400 })
  }
  const res = NextResponse.json(await recommendSongParameter(input, seedTrack))
  return res
}
