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

const roundToHour = (dateString: string) => {
  const date = dayjs(dateString)
  return date.hour(date.hour()).minute(0).second(0).millisecond(0).format()
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
const aggregateByHour = (
  data: AggregatedData | null,
  process: (dataPoints: GenericData[]) => number,
): { [key: string]: number } | null => {
  if (!data) return null

  const result: { [key: string]: number } = {}
  const groupedByHour: { [key: string]: GenericData[] } = {}

  for (const point of data.points) {
    if (point.startDate && point.value !== null) {
      const roundedDate = roundToHour(point.startDate)
      if (!groupedByHour[roundedDate]) {
        groupedByHour[roundedDate] = []
      }
      groupedByHour[roundedDate].push(point)
    }
  }

  for (const hour of Object.keys(groupedByHour)) {
    result[hour] = process(groupedByHour[hour])
  }

  return result
}

export const countingHourlySum = (data: AggregatedData | null) =>
  aggregateByHour(data, (dataPoints) => {
    return dataPoints.reduce((acc, curr) => acc + (curr.value || 0), 0)
  })

export const countingHourlyAverage = (data: AggregatedData | null) =>
  aggregateByHour(data, (dataPoints) => {
    if (dataPoints.length === 0) return 0
    const sum = dataPoints.reduce((acc, curr) => acc + (curr.value || 0), 0)
    return sum / dataPoints.length
  })
