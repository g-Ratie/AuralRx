import { GOOGLEFIT_CLIENT_ID, GOOGLEFIT_CLIENT_SECRET } from '@/common/envValues'
import { google } from 'googleapis'
import { aggregateData, countingHourlyAverage, countingHourlySum } from './aggregateFitnessData'

const getTodayTimestamps = () => {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, -1)
  return {
    from: startOfDay.getTime() * 1e6, // ミリ秒→ナノ秒に変換
    to: endOfDay.getTime() * 1e6,
  }
}

export const getStepCount = async (accessToken: string) => {
  const { from, to } = getTodayTimestamps()
  const auth = new google.auth.OAuth2({
    clientId: GOOGLEFIT_CLIENT_ID,
    clientSecret: GOOGLEFIT_CLIENT_SECRET,
  })
  auth.setCredentials({ access_token: accessToken })
  const fitness = google.fitness({ auth: auth, version: 'v1' })
  try {
    const dataset = await fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
      datasetId: `${from}-${to}`,
    })

    return aggregateData(dataset.data, 'intVal')
  } catch (error) {
    console.error('Error fetching step count:', error)
    throw error
  }
}

export const getHeartRate = async (accessToken: string) => {
  const { from, to } = getTodayTimestamps()
  const auth = new google.auth.OAuth2({
    clientId: GOOGLEFIT_CLIENT_ID,
    clientSecret: GOOGLEFIT_CLIENT_SECRET,
  })
  auth.setCredentials({ access_token: accessToken })
  const fitness = google.fitness({ auth: auth, version: 'v1' })
  try {
    const dataset = await fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
      datasetId: `${from}-${to}`,
    })
    return aggregateData(dataset.data, 'fpVal')
  } catch (error) {
    console.error('Error fetching step count:', error)
    throw error
  }
}

export const getFitnessData = async (accessToken: string) => {
  const auth = new google.auth.OAuth2({
    clientId: GOOGLEFIT_CLIENT_ID,
    clientSecret: GOOGLEFIT_CLIENT_SECRET,
  })

  auth.setCredentials({ access_token: accessToken })

  try {
    const stepData = await getStepCount(accessToken)
    const heartRateData = await getHeartRate(accessToken)

    return {
      step: countingHourlySum(stepData),
      heartrate: countingHourlyAverage(heartRateData),
    }
  } catch (error) {
    console.error('Error fetching fitness data:', error)
    throw error
  }
}
