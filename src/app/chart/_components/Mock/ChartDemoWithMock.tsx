'use client'
import { FitnessOutput } from '@/common/LLM/fitnessOutputSchema'
import { Loading } from '@/components/ui/Loading'
import { fetchFitnessDataWithMock } from '@/utils/fetchAPIData'
import { useEffect, useState } from 'react'
import FitnessChart from '../FitnessDataCharts'
import FetchDataButtonWithMock from './FetchDataButtonWithMock'

export default function ChartDemoWithMock() {
  const [fitnessData, setFitnessData] = useState<FitnessOutput | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const res = await fetchFitnessDataWithMock()
      if (res) {
        setFitnessData(res)
        setIsLoading(false)
      }
      setIsLoading(false)
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
          <FetchDataButtonWithMock fitnessData={fitnessData} />
        </>
      ) : (
        <div>Error loading fitness data.</div>
      )}
    </div>
  )
}
