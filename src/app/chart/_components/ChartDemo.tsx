import { fetchFitnessData, fetchFitnessDataWithMock } from '@/utils/fetchAPIData'
import FetchDataButton from './FetchDataButton'
import FitnessChart from './FitnessDataCharts'

export default async function ChartDemo() {
  const fitnessData = await fetchFitnessDataWithMock()

  if (!fitnessData) return <div>Error loading fitness data.</div>

  return (
    <div>
      <FitnessChart data={fitnessData} />
      <FetchDataButton fitnessData={fitnessData} />
    </div>
  )
}
