import dayjs from 'dayjs'
import { fitness_v1 } from 'googleapis'

type GenericData = {
  startDate: string | null
  endDate: string | null
  value: number | null | undefined
}

type AggregatedData = {
  dataTypeName: string | null | undefined
  points: GenericData[]
}

const nanosecToDate = (nanosec: string | null | undefined): string | null => {
  if (nanosec === null || nanosec === undefined) return null
  const date = dayjs(parseInt(nanosec) / 1e6)
  return date.format()
}

export const aggregateData = (
  data: fitness_v1.Schema$Dataset,
  valueType: 'intVal' | 'fpVal',
): AggregatedData | null => {
  const { dataSourceId, point } = data
  if (!point || point.length === 0) return null

  const isDataTypeNameConsistent = point.every((p) => p.dataTypeName === point[0].dataTypeName)
  if (!isDataTypeNameConsistent) return null

  const dataTypeName = dataSourceId
  const points = point.map((p) => {
    const { startTimeNanos, endTimeNanos, value } = p
    return {
      startDate: nanosecToDate(startTimeNanos),
      endDate: nanosecToDate(endTimeNanos),
      value: value?.[0] ? value[0][valueType] : null,
    }
  })

  return { dataTypeName, points }
}

export const countingHourlySum = (
  data: AggregatedData | null,
): { [key: string]: number } | null => {
  if (data === null) return null
  const roundToHour = (dateString: string) => {
    const date = dayjs(dateString)
    return date.hour(date.hour()).minute(0).second(0).millisecond(0).format() 
  }
  const result = new Map<string, number>()

  for (const point of data.points) {
    if (point.startDate && point.value) {
      const roundedDate = roundToHour(point.startDate)
      const currentValue = result.get(roundedDate) || 0
      result.set(roundedDate, currentValue + point.value)
    }
  }

  const objectResult: { [key: string]: number } = {}
  result.forEach((value, key) => {
    objectResult[key] = value
  })

  return objectResult
}

export const countingHourlyAverage = (
  data: AggregatedData | null,
): { [key: string]: number } | null => {
  if (data === null) return null
  const roundToHour = (dateString: string) => {
    const date = dayjs(dateString)
    return date.hour(date.hour()).minute(0).second(0).millisecond(0).format()
  }

  const sums = new Map<string, number>()
  const counts = new Map<string, number>()

  for (const point of data.points) {
    if (point.startDate && point.value) {
      const roundedDate = roundToHour(point.startDate)
      const currentSum = sums.get(roundedDate) || 0
      sums.set(roundedDate, currentSum + point.value)

      const currentCount = counts.get(roundedDate) || 0
      counts.set(roundedDate, currentCount + 1)
    }
  }

  const averages: { [key: string]: number } = {}
  sums.forEach((sum, key) => {
    const count = counts.get(key) || 1
    averages[key] = sum / count
  })

  return averages
}
