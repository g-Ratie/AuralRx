'use client'

import { Button } from '@/components/ui/Button'
import { IconBrandGoogleFit } from '@tabler/icons-react'

export const Fitness = async () => {
  return (
    <div>
      <Button label="Fitデータ取得" Icon={IconBrandGoogleFit} />
    </div>
  )
}
