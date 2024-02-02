'use client'
import { FitnessOutput } from '@/common/LLM/fitnessOutputSchema'
import { Loading } from '@/components/ui/Loading'
import { fetchFitnessDataWithMock } from '@/utils/fetchAPIData'
import { useEffect, useState } from 'react'
import FitnessChart from '../../../../components/chart/FitnessDataCharts'
import ButtonsParentClient from '../ButtonsParentClient'

const ChartDemoWithMock = () => {
  const [fitnessData, setFitnessData] = useState<FitnessOutput>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFitnessDataWithMock()
      .then((res) => {
        if (!res) return
        setFitnessData(res)
        setIsLoading(false)
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <Loading visible={isLoading} />
  if (fitnessData === undefined) return <div>Error loading fitness data.</div>

  return (
    <div>
      <p>モックデータ</p>
      <FitnessChart data={fitnessData} />
      <ButtonsParentClient fitnessData={fitnessData} />
    </div>
  )
}

export default ChartDemoWithMock
