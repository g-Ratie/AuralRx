import { GOOGLEFIT_CLIENT_ID, GOOGLEFIT_CLIENT_SECRET } from '@/common/envValues'
import { google } from 'googleapis'
import { NextResponse } from 'next/server'

const scope = [
  'userinfo.profile',
  'userinfo.email',
  'fitness.activity.read',
  'fitness.location.read',
  'fitness.body.read',
  'fitness.heart_rate.read',
].map((s) => `https://www.googleapis.com/auth/${s}`)

const redirect_uri = 'http://localhost:3000/api/auth/google/callback'

export const GET = async () => {
  const googleApiClient = new google.auth.OAuth2(
    GOOGLEFIT_CLIENT_ID,
    GOOGLEFIT_CLIENT_SECRET,
    redirect_uri,
  )
  const url = googleApiClient.generateAuthUrl({
    scope: scope,
  })

  return NextResponse.redirect(url)
}
