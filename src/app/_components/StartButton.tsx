'use client'

import { Button } from '@/components/ui/Button'
import { IconDoorEnter } from '@tabler/icons-react'
import Link from 'next/link'

export const StartButton = () => {
  return (
    <Link href="/app">
      <Button Icon={IconDoorEnter} label="はじめる" style={{ backgroundColor: '#f9f9f9' }} />
    </Link>
  )
}
