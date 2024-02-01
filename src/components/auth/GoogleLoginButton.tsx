'use client'

import Link from 'next/link'
import { IconGoogle } from '../icon/IconGoogle'
import { Button } from '../ui/Button'

export const GoogleLoginButton = () => {
  return (
    <Link href="/api/auth/google/login">
      <Button Icon={IconGoogle} label="Googleでログイン" style={{ backgroundColor: '#f3f3f3' }} />
    </Link>
  )
}
