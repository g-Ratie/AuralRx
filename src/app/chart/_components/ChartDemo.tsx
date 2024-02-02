'use client'
import { FitnessOutput, fitnessOutputSchema } from '@/common/LLM/fitnessOutputSchema'
import { Loading } from '@/components/ui/Loading'
import { useEffect, useState } from 'react'
import FitnessChart from '../../../components/chart/FitnessDataCharts'
import ButtonsParentClient from './ButtonsParentClient'

const ChartDemo = () => {
  const [fitnessData, setFitnessData] = useState<FitnessOutput | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/fitness')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        const data = res.json()
        const parsedData = fitnessOutputSchema.parse(data)
        setFitnessData(parsedData)
      })
      .catch((error) => {
        console.error('Error loading fitness data:', error)
        setFitnessData(null)
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <Loading visible={isLoading} />
  if (fitnessData === null) return <div>Error loading fitness data.</div>

  return (
    <div>
      <FitnessChart data={fitnessData} />
      <ButtonsParentClient fitnessData={fitnessData} />
    </div>
  )
}

export default ChartDemo
