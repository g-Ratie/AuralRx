'use client'

import { IconBrandSpotify } from '@tabler/icons-react'
import { useMemo } from 'react'
import { Button } from '../ui/Button'

type Props = {
  clientId: string
}

export const SpotifyLoginButton = ({ clientId }: Props) => {
  const redirectUri = 'http://localhost:3000/api/auth/spotify'
  const scopes = [
    'playlist-modify-public',
    'playlist-modify-private',
    'user-read-playback-state',
    'user-modify-playback-state',
  ]

  const authorizeUrl = useMemo(() => {
    const url = new URL('https://accounts.spotify.com/authorize')
    url.searchParams.set('client_id', clientId)
    url.searchParams.set('redirect_uri', redirectUri)
    url.searchParams.set('scope', scopes.join(' '))
    url.searchParams.set('response_type', 'code')
    return url.toString()
  }, [clientId])

  return (
    <a href={authorizeUrl}>
      <Button
        Icon={IconBrandSpotify}
        label="Spotifyでログイン"
        style={{ backgroundColor: '#1DB954' }}
      />
    </a>
  )
}
