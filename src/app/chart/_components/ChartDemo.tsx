import { fetchFitnessData } from '@/utils/fetchAPIData'
import FitnessChart from './FitnessDataCharts'
import FetchDataButton from './RecommendButton'

export default async function ChartDemo() {
  const fitnessData = await fetchFitnessData()

  if (!fitnessData) return <div>Error loading fitness data.</div>

  return (
    <div>
      <FitnessChart data={fitnessData} />
      <FetchDataButton fitnessData={fitnessData} />
    </div>
  )
}
