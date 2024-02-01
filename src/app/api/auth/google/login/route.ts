import {
  GOOGLEFIT_CLIENT_ID,
  GOOGLEFIT_CLIENT_SECRET,
  GOOGLEFIT_REDIRECT_URI,
} from '@/common/envValues'
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

export const GET = async () => {
  const googleApiClient = new google.auth.OAuth2(
    GOOGLEFIT_CLIENT_ID,
    GOOGLEFIT_CLIENT_SECRET,
    GOOGLEFIT_REDIRECT_URI,
  )
  const url = googleApiClient.generateAuthUrl({
    scope: scope,
  })

  return NextResponse.redirect(url)
}
