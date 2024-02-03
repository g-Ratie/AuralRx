import { z } from 'zod'
import { song_genre } from './promptTemplate'

const baseRecommendationSchema = z.object({
  targetEnergy: z
    .number()
    .min(0)
    .max(1)
    .describe('曲のエネルギーを示す指標, 0から1の範囲で指定し, この値に近い曲が選択される'),
  targetInstrumentalness: z
    .number()
    .min(0)
    .max(1)
    .describe(
      '曲がインストゥルメンタルである可能性を示す指標, 0から1の範囲で指定し, この値に近い曲が選択される',
    ),
  targetValence: z
    .number()
    .min(0)
    .max(1)
    .describe('曲のポジティブさを示す指標, 0から1の範囲で指定し, この値に近い曲が選択される'),
  comment: z
    .string()
    .describe(
      'どんな曲をイメージしてこれらのパラメータを指定したかについてのコメントを書いてください。なお、activity_inferenceの内容を入れる必要はない\n例:{推定される活動}をしているようですので、{どんな曲かの説明}な曲をおすすめしました。',
    ),
})

export const recommendationSchemaWithSeedGenres = baseRecommendationSchema.extend({
  seedGenres: z
    .string()
    .array()
    .describe(
      `指定されたジャンルに基づいてレコメンデーションを行うためのジャンル。利用可能なジャンルのセット\n${song_genre}\nからカンマ区切りで最大5つまで指定可能。`,
    ),
})

const recommendationSchemaWithSeedTracks = baseRecommendationSchema.extend({
  seedTracks: z
    .string()
    .array()
    .describe(
      'レコメンデーションのために使用する曲のトラックID。カンマ区切りで最大5つまで指定可能。',
    ),
})

export const extendedRecommendationSchema = z.union([
  recommendationSchemaWithSeedGenres,
  recommendationSchemaWithSeedTracks,
])

export type ExtendedRecommendationParams = z.infer<typeof extendedRecommendationSchema>

export type RecommendationParamsWithSeedGenres = z.infer<typeof recommendationSchemaWithSeedGenres>
export type RecommendationParamsWithSeedTracks = z.infer<typeof recommendationSchemaWithSeedTracks>
