'use client'

import { FitnessOutput } from '@/common/LLM/fitnessOutputSchema'
import { ExtendedRecommendationParams } from '@/common/LLM/recommendOutputSchema'
import { MusicCard } from '@/components/music/MusicCard'
import { Loading } from '@/components/ui/Loading'
import { Track } from '@spotify/web-api-ts-sdk'
import { useEffect, useState } from 'react'

const PlayClient = () => {
  const [fitnessData, setFitnessData] = useState<FitnessOutput | null>(null)
  const [recommendationParams, setRecommendationParams] =
    useState<ExtendedRecommendationParams | null>(null)
  const [recommendSongData, setRecommendSongData] = useState<Track[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('fetching fitness data')
    fetch('/api/fitness')
      .then((response) => response.json())
      .then((data) => {
        setFitnessData(data)
      })
      .catch((error) => console.error('Error loading fitness data:', error))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (fitnessData === null) return
    console.log('fetching recommendation data')
    setIsLoading(true)
    fetch('/api/fitness', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fitnessData),
    })
      .then((response) => response.json())
      .then((data) => setRecommendationParams(data))
      .catch((error) => console.error('Error updating fitness data:', error))
      .finally(() => setIsLoading(false))
  }, [fitnessData])

  useEffect(() => {
    if (recommendationParams === null) return
    console.log('fetching recommended data')
    setIsLoading(true)
    fetch('/api/spotify/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recommendationParams),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecommendSongData(data.selectedTracks)
        console.log('recommendSongData:', data.selectedTracks)
      })
      .catch((error) => console.error('Error fetching recommended data:', error))
      .finally(() => setIsLoading(false))
  }, [recommendationParams])

  if (isLoading) return <Loading visible={isLoading} />
  if (!fitnessData || !recommendationParams || !recommendSongData) return <p>データがありません</p>

  return (
    <div>
      <h2>プレイリスト</h2>
      {recommendSongData.map((music) => (
        <MusicCard key={music.id} music={music} />
      ))}
    </div>
  )
}

export default PlayClient
