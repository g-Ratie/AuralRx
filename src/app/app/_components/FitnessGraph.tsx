'use client'

import { FitnessOutput } from '@/common/LLM/fitnessOutputSchema'
import FitnessChart from '@/components/chart/FitnessDataCharts'
import { Loading } from '@/components/ui/Loading'
import { useEffect, useState } from 'react'

export const FitnessGraph = () => {
  const [data, setData] = useState<FitnessOutput>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('/api/fitness')
      .then((res) => res.json())
      .then((data) => setData(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) <Loading visible={loading} />

  return <FitnessChart data={data} />
}
