import { z } from 'zod'

const heartRateSummarySchema = z.object({
  average: z.number().describe('平均心拍数'),
  min: z.number().describe('最低心拍数'),
  max: z.number().describe('最高心拍数'),
})

const stepsSummarySchema = z.object({
  total: z.number().describe('総歩数'),
})

const activityAnalysisSchema = z.object({
  start_time: z
    .string()
    .describe("活動開始時刻を'HH:mm'形式で記載してください。")
    .regex(/^\d{2}:\d{2}$/),
  end_time: z
    .string()
    .describe("活動終了時刻を'HH:mm'形式で記載してください。")
    .regex(/^\d{2}:\d{2}$/),
  heart_rate_summary: heartRateSummarySchema,
  steps_summary: stepsSummarySchema,
  activity_inference: z
    .string()
    .describe('推定された活動状況についての考察が50~100字程度で記載されます。'),
})

export const fitnessOutputSchema = z.object({
  activity_analysis: z.array(activityAnalysisSchema),
})
