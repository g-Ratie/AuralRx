'use client'

import { IconGoogle } from '@/components/icon/IconGoogle'
import { Button } from '@/components/ui/Button'
import { IconBrandSpotify, TablerIconsProps } from '@tabler/icons-react'
import { ClientSafeProvider, signIn } from 'next-auth/react'
import { FC } from 'react'

type Props = {
  loginProvider: ClientSafeProvider
}

const icons: Partial<Record<ClientSafeProvider['id'], FC<TablerIconsProps>>> = {
  spotify: IconBrandSpotify,
  google: IconGoogle,
}

const colors: Partial<Record<ClientSafeProvider['id'], string>> = {
  spotify: '#1DB954',
  google: '#eee',
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
