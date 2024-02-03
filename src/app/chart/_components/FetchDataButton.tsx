'use client'
import { PostFitnessAPIRequestBody } from '@/app/api/fitness/route'
import { FitnessOutput } from '@/common/LLM/fitnessOutputSchema'
import { extendedRecommendationSchema } from '@/common/LLM/recommendOutputSchema'
import { Button } from '@/components/ui/Button'
import { z } from 'zod'

type Props = {
  fitnessData: FitnessOutput
}

export const FetchDataButton = ({ fitnessData }: Props) => {
  const fetchRecommendedData = async (fitnessData: FitnessOutput, seedTrack: string[] | null) => {
    const reqBody: PostFitnessAPIRequestBody = {
      activityAnalysis: fitnessData.activityAnalysis,
      seedTrack: seedTrack,
    }
    const res = await fetch('/api/fitness', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) return null
    const data = await res.json()

    try {
      return z.array(extendedRecommendationSchema).parse(data)
    } catch (error) {
      console.error('Error fetching recommended data:', error)
      return null
    }
  }

  const handleClick = async () => {
    fetchRecommendedData(fitnessData, null)
  }

  return <Button onClick={handleClick} label="レコメンドを取得" />
}
