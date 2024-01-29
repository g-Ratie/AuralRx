import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from './nextAuthConfig'

export const getaccessToken = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  }
  if (!session.user.accessToken) {
    console.log(session)
    return NextResponse.json({ error: 'No access token' }, { status: 401 })
  }
  return session.user.accessToken
}
