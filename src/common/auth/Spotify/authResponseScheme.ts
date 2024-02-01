import { z } from 'zod'

export const spotifyAuthResponseScheme = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
  scope: z.string(),
})

export type SpotifyAuthResponse = z.infer<typeof spotifyAuthResponseScheme>
