import dayjs from 'dayjs'
import { countingHourlyAverage, countingHourlySum } from './aggregateFitnessData'

export const getMockHeartRate = async () => {
  const generateMockData = () => {
    const dataPoints = []
    const today = dayjs()
    const startTime = today.hour(8).minute(0).second(0)
    const endTime = today.hour(12).minute(0).second(0)

    for (let time = dayjs(startTime); time.isBefore(endTime); time = time.add(15, 'minute')) {
      const value = Math.floor(Math.random() * (170 - 60 + 1) + 60)
      dataPoints.push({
        startDate: time.format(),
        endDate: time.format(),
        value: value,
      })
    }

    return {
      dataTypeName: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
      points: dataPoints,
    }
  }

  return generateMockData()
}

export const getMockStep = async () => {
  const generateMockData = () => {
    const dataPoints = []
    const today = dayjs()
    const startTime = today.hour(8).minute(0).second(0)
    const endTime = today.hour(12).minute(0).second(0)

    for (let time = dayjs(startTime); time.isBefore(endTime); time = time.add(15, 'minute')) {
      const value = Math.floor(Math.random() * (5000 - 100 + 1) + 100)
      dataPoints.push({
        startDate: time.format(),
        endDate: time.format(),
        value: value,
      })
    }

    return {
      dataTypeName: 'derived:com.google.step_count.delta:com.google.android.gms:merge_step_deltas',
      points: dataPoints,
    }
  }

  return generateMockData()
}

export const getMockFitnessData = async () => {
  const stepData = await getMockStep()
  const heartRateData = await getMockHeartRate()
  return {
    heartRate: countingHourlyAverage(heartRateData),
    step: countingHourlySum(stepData),
  }
}
