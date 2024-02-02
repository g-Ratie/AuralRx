'use client'

import { Button } from '@/components/ui/Button'
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk'
import { IconMusicBolt } from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'
import styles from './AppClient.module.css'
import { FitnessGraph } from './FitnessGraph'
import { SelectPlayList } from './SelectPlayList'
import { Title } from './Title'

export const AppClient = () => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<SimplifiedPlaylist['id'] | 'liked'>()

  const handleSelect = (id: SimplifiedPlaylist['id'] | 'liked') => {
    setSelectedPlaylistId(id)
  }

  return (
    <div className={styles.container}>
      <section>
        <Title title="フィットネスデータを取得" number="1" />
        <p>Google Fitからフィットネスデータを取得します。</p>
        <FitnessGraph />
      </section>
      <section>
        <Title title="プレイリストの選択" number="2" />
        <p>既存のプレイリストをもとに曲をレコメンドします。</p>
        <SelectPlayList selectedId={selectedPlaylistId} handleSelect={handleSelect} />
      </section>
      <section>
        <Title title="プレイリストを生成" number="3" />
        <p>ヘルスケア情報と普段聞いている曲からあなたにあった曲を生成します。</p>
        <Link href="/app/play">
          <Button
            label="プレイリストを生成"
            Icon={IconMusicBolt}
            style={{ backgroundColor: '#f9f9f9' }}
          />
        </Link>
      </section>
    </div>
  )
}
