import { z } from 'zod'

const heartRateSummarySchema = z
  .object({
    average: z.number().describe('平均心拍数'),
    min: z.number().describe('最低心拍数,データが一つの場合は平均心拍数が最大心拍数となります。'),
    max: z.number().describe('最高心拍数,データが一つの場合は平均心拍数が最小心拍数となります。'),
  })
  .nullable()

const stepsSummarySchema = z
  .object({
    total: z.number().describe('総歩数,データが存在しない場合は0'),
  })
  .nullable()

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
    .describe('データから推定された活動状況についての考察が100字程度で記載されます。'),
})

export const fitnessOutputSchema = z.object({
  activityAnalysis: z.array(activityAnalysisSchema),
})

export type FitnessOutput = z.infer<typeof fitnessOutputSchema>
