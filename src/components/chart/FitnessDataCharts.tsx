'use client'
import { FitnessOutput } from '@/common/LLM/fitnessOutputSchema'
import { useEffect, useMemo, useState } from 'react'
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface FitnessChartProps {
  data: FitnessOutput | undefined
}

const transformDataForChart = (data: FitnessOutput | undefined) => {
  if (!data || !data.activityAnalysis) return []

  return data.activityAnalysis.map((activity) => ({
    time: activity.start_time,
    averageHeartRate: activity.heart_rate_summary?.average || 0,
    totalSteps: activity.steps_summary?.total || 0,
  }))
}

const FitnessChart: React.FC<FitnessChartProps> = ({ data }) => {
  const [containerHeight, setContainerHeight] = useState<number>(0)

  useEffect(() => {
    const windowHeight = window.innerHeight
    const chartHeight = windowHeight * 0.4
    setContainerHeight(chartHeight)

    const handleResize = () => {
      const newWindowHeight = window.innerHeight
      const newChartHeight = newWindowHeight * 0.4
      setContainerHeight(newChartHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const chartData = useMemo(() => transformDataForChart(data), [data])

  return (
    <ResponsiveContainer width="100%" height={containerHeight}>
      <ComposedChart data={chartData} margin={{ top: 15, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis yAxisId="heartRate" orientation="left" stroke="#ea6d82" domain={[0, 230]} />
        <YAxis yAxisId="steps" orientation="right" stroke="#7ee28c" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="steps"
          type="monotone"
          dataKey="totalSteps"
          stroke="#7ee28c"
          strokeWidth={2.5}
          dot={false}
          name="平均歩数"
        />
        <Line
          yAxisId="heartRate"
          type="monotone"
          dataKey="averageHeartRate"
          stroke="#ea6d82"
          dot={false}
          strokeWidth={2}
          name="平均心拍数"
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default FitnessChart
