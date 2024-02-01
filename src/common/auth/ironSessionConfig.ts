import { SessionOptions } from 'iron-session'
import { IRON_SESSION_PASSWORD } from '../envValues'

export const spotifySessionOptions: SessionOptions = {
  password: IRON_SESSION_PASSWORD,
  cookieName: 'spotify-auth',
}

export type SpotifySession = {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

export const googleSessionOptions: SessionOptions = {
  password: IRON_SESSION_PASSWORD,
  cookieName: 'google-auth',
}

export type GoogleSession = {
  accessToken?: string
  refreshToken?: string
  expiresAt?: number
}
