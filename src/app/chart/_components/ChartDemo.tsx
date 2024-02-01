'use client'
import { FitnessOutput, fitnessOutputSchema } from '@/common/LLM/fitnessOutputSchema'
import { useEffect, useState } from 'react'
import { Loading } from '../../../components/ui/Loading'
import FetchDataButton from './FetchDataButton'
import FitnessChart from './FitnessDataCharts'

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
