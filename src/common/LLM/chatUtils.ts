import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'
import { RunnableSequence } from 'langchain/runnables'
import { z } from 'zod'
import { geminiModel } from './geminiModel'
import { song_genre } from './promptTemplate'

const recommendationSchema = z.object({
  seedGenres: z
    .string()
    .array()
    .describe(
      `指定されたジャンルに基づいてレコメンデーションを行うためのジャンル。利用可能なジャンルのセット\n${song_genre}\nからカンマ区切りで最大5つまで指定可能。`,
    ),
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
})
type RecommendationParams = z.infer<typeof recommendationSchema>

export const recomendSongParameter = async (): Promise<RecommendationParams> => {
  const parser = StructuredOutputParser.fromZodSchema(recommendationSchema)
  const chain = RunnableSequence.from([
    //TODO: データにしたらプロンプトの表現の仕方を変える
    PromptTemplate.fromTemplate(
      '{format_parser}\n以下の場面を元に、適した曲をレコメンドするためのパラメータを設定し、指定した形式のJSONで返してください.\n{explain}',
    ),
    geminiModel,
    parser,
  ])
  const result = await chain.invoke({
    //TODO: ヘルスケアデータに差し替え(場合によってはヘルスケアデータ->説明文の処理が必要？)
    explain: 'ユーザーはお昼ごはんを食べています',
    format_parser: parser.getFormatInstructions(),
  })
  //
  const filteredSeedGenres = result.seedGenres.filter((genre) => song_genre.includes(genre))
  result.seedGenres = filteredSeedGenres

  return result
}
