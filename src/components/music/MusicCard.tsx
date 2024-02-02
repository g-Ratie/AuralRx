import { Track } from '@spotify/web-api-ts-sdk'
import { IconBrandSpotify } from '@tabler/icons-react'
import Link from 'next/link'
import styles from './MusicCard.module.css'

type Props = {
  music: Track
}

export const MusicCard = async ({ music }: Props) => {
  return (
    <div className={styles.container}>
      <img src={music.album.images[0].url} alt={music.name} className={styles.image} />
      <h2 className={styles.title}>{music.name}</h2>
      <p className={styles.artist}>{music.artists.map((artist) => artist.name).join(', ')}</p>
      <p className={styles.album}>{music.album.name}</p>
      <Link href={music.external_urls.spotify} className={styles.spotify}>
        <IconBrandSpotify size={24} />
      </Link>
    </div>
  )
}
