import dayjs from 'dayjs'
import { countingHourlyAverage, countingHourlySum } from './aggregateFitnessData'

type ActivityType = 'resting' | 'lightExercise' | 'intenseExercise'

const activityRanges: Record<ActivityType, { heartRate: number[]; steps: number[] }> = {
  resting: {
    heartRate: [60, 80],
    steps: [10, 500],
  },
  lightExercise: {
    heartRate: [80, 120],
    steps: [1000, 2000],
  },
  intenseExercise: {
    heartRate: [120, 170],
    steps: [2000, 4000],
  },
}

const activityTypes: ActivityType[] = ['resting', 'lightExercise', 'intenseExercise']

const generateMockData = (
  startTime: dayjs.Dayjs,
  endTime: dayjs.Dayjs,
  type: 'heartRate' | 'steps',
) => {
  const dataPoints = []
  for (let time = dayjs(startTime); time.isBefore(endTime); time = time.add(15, 'minute')) {
    // 各データポイントごとに活動タイプをランダムに選択
    const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)]
    const range = activityRanges[activityType][type]

    const value = Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0])
    dataPoints.push({
      startDate: time.format(),
      endDate: time.format(),
      value,
    })
  }
  return dataPoints
}

export const getMockFitnessData = () => {
  const today = dayjs()
  const startTime = today.hour(8).minute(0).second(0)
  const endTime = today.hour(12).minute(0).second(0)

  const heartRateData = {
    dataTypeName: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
    points: generateMockData(startTime, endTime, 'heartRate'),
  }

  const stepData = {
    dataTypeName: 'derived:com.google.step_count.delta:com.google.android.gms:merge_step_deltas',
    points: generateMockData(startTime, endTime, 'steps'),
  }

  return {
    heartRate: countingHourlyAverage(heartRateData),
    step: countingHourlySum(stepData),
  }
}
