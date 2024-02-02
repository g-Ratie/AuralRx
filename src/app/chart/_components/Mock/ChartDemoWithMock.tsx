'use client'
import { FitnessOutput } from '@/common/LLM/fitnessOutputSchema'
import { Loading } from '@/components/ui/Loading'
import { fetchFitnessDataWithMock } from '@/utils/fetchAPIData'
import { useEffect, useState } from 'react'
import FitnessChart from '../../../../components/chart/FitnessDataCharts'
import ButtonsParentClient from './ButtonsParentClient'

const ChartDemoWithMock = () => {
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
      <p>モックデータ</p>
      {isLoading ? (
        <Loading visible={isLoading} />
      ) : fitnessData ? (
        <>
          <FitnessChart data={fitnessData} />
          <ButtonsParentClient fitnessData={fitnessData} />
        </>
      ) : (
        <div>Error loading fitness data.</div>
      )}
    </div>
  )
}

export default ChartDemoWithMock
