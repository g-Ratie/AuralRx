import { spotifyClient } from '@/service/spotifyClient'
import styles from './page.module.css'

export default async function Home() {
  const tracks = await spotifyClient.search('あ', ['track'], 'JP')
  const devices = await spotifyClient.player.getAvailableDevices()
  return (
    <main className={styles.main}>
      {tracks.tracks.items.map((track) => (
        <div key={track.id}>
          <img src={track.album.images[0].url} alt={track.name} />
          <div>
            <h2>{track.name}</h2>
            <p>{track.artists.map((artist) => artist.name).join(', ')}</p>
          </div>
        </div>
      ))}
    </main>
  )
}
