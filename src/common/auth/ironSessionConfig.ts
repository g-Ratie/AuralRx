import { SessionOptions } from 'iron-session'
import { IRON_SESSION_PASSWORD } from '../../service/envValues'

export const sessionOptions: SessionOptions = {
  password: IRON_SESSION_PASSWORD,
  cookieName: 'spotify-auth',
}

export type SpotifySession = {
  accessToken: string
  refreshToken: string
  expiresAt: number
}
