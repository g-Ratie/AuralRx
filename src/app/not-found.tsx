'use client'

import { Button } from '@/components/ui/Button'
import { IconHome } from '@tabler/icons-react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <Link href="/">
        <Button label="トップページへ戻る" Icon={IconHome} style={{ backgroundColor: '#f9f9f9' }} />
      </Link>
    </div>
  )
}

export default NotFound
