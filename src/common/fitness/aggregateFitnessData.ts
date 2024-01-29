import { fitness_v1 } from 'googleapis'

type GenericData = {
  startDate: Date | null
  endDate: Date | null
  value: number | null | undefined
}

type AggregatedData = {
  dataTypeName: string | null | undefined
  points: GenericData[]
}

const nanosectoDate = (nanosec: string | null | undefined) => {
  if (nanosec === null || nanosec === undefined) return null
  const date = new Date(parseInt(nanosec) / 1e6)
  return date
}

// 汎用的なデータ抽出・集約関数
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
      startDate: nanosectoDate(startTimeNanos),
      endDate: nanosectoDate(endTimeNanos),
      value: value?.[0] ? value[0][valueType] : null,
    }
  })

  return { dataTypeName, points }
}

export const countingHourlySum = (data: AggregatedData): { [key: string]: number } => {
  const roundToHour = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours())
  }
  const result = new Map<string, number>()

  for (const point of data.points) {
    if (point.startDate && point.value) {
      const roundedDate = roundToHour(point.startDate)
      const hourKey = roundedDate.toISOString()

      const currentValue = result.get(hourKey) || 0
      result.set(hourKey, currentValue + point.value)
    }
  }

  const objectResult: { [key: string]: number } = {}
  result.forEach((value, key) => {
    objectResult[key] = value
  })

  return objectResult
}

export const countingHourlyAverage = (data: AggregatedData): { [key: string]: number } => {
  const roundToHour = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours())
  }

  const sums = new Map<string, number>()
  const counts = new Map<string, number>()

  for (const point of data.points) {
    if (point.startDate && point.value) {
      const roundedDate = roundToHour(point.startDate)
      const hourKey = roundedDate.toISOString()

      const currentSum = sums.get(hourKey) || 0
      sums.set(hourKey, currentSum + point.value)

      const currentCount = counts.get(hourKey) || 0
      counts.set(hourKey, currentCount + 1)
    }
  }

  const averages: { [key: string]: number } = {}
  sums.forEach((sum, key) => {
    const count = counts.get(key) || 1
    averages[key] = sum / count
  })

  return averages
}
