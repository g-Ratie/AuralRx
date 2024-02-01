import { z } from 'zod'

export const googleAuthResponseScheme = z.object({
  accessToken: z.string().nullish(),
  expiryDate: z.number().nullish(),
  scope: z.string().nullish(),
  tokenType: z.string().nullish(),
  idToken: z.string().nullish(),
  refreshToken: z.string().nullish(),
})

export type GoogleAuthResponse = z.infer<typeof googleAuthResponseScheme>
