'use client'

import { ClientSafeProvider, signIn } from 'next-auth/react'

type Props = {
  loginProvider: ClientSafeProvider
}

export const LoginButton = ({ loginProvider }: Props) => {
  return (
    <button onClick={() => signIn(loginProvider.id)} type="button">
      {loginProvider.name}にログイン
    </button>
  )
}
