'use client'

import { Button } from '@/components/ui/Button'
import { IconBrandGoogle, IconBrandSpotify, TablerIconsProps } from '@tabler/icons-react'
import { ClientSafeProvider, signIn } from 'next-auth/react'
import { FC } from 'react'

type Props = {
  loginProvider: ClientSafeProvider
}

const icons: Partial<Record<ClientSafeProvider['id'], FC<TablerIconsProps>>> = {
  spotify: IconBrandSpotify,
  google: IconBrandGoogle,
}

const colors: Partial<Record<ClientSafeProvider['id'], string>> = {
  spotify: '#1DB954',
  google: '#4285F4',
}

export const LoginButton = ({ loginProvider }: Props) => {
  return (
    <Button
      Icon={icons[loginProvider.id]}
      onClick={() => signIn(loginProvider.id)}
      label={`${loginProvider.name}にログイン`}
      style={{ backgroundColor: colors[loginProvider.id] }}
    />
  )
}
