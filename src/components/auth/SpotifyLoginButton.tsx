'use client'

import { IconBrandSpotify } from '@tabler/icons-react'
import Link from 'next/link'
import { Button } from '../ui/Button'

export const SpotifyLoginButton = () => {
  return (
    <Link href="/api/auth/spotify/login">
      <Button
        Icon={IconBrandSpotify}
        label="Spotifyでログイン"
        style={{ backgroundColor: '#1DB954' }}
      />
    </Link>
  )
}
