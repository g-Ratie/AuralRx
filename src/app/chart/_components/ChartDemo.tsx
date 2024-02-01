'use client'
import { FitnessOutput, fitnessOutputSchema } from '@/common/LLM/fitnessOutputSchema'
import { Loading } from '@/components/ui/Loading'
import { useEffect, useState } from 'react'
import FitnessChart from '../../../components/chart/FitnessDataCharts'
import FetchDataButton from './FetchDataButton'

export default function ChartDemo() {
  const [fitnessData, setFitnessData] = useState<FitnessOutput | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/fitness', { method: 'GET' })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const responseData = await response.json()
        const parsedFitnessData = fitnessOutputSchema.parse(responseData)
        setFitnessData(parsedFitnessData)
      } catch (error) {
        console.error('Error loading fitness data:', error)
        setFitnessData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {isLoading ? (
        <Loading visible={isLoading} />
      ) : fitnessData ? (
        <>
          <FitnessChart data={fitnessData} />
          <FetchDataButton fitnessData={fitnessData} />
        </>
      ) : (
        <div>Error loading fitness data.</div>
      )}
    </div>
  )
}
