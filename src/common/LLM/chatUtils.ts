import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'
import { RunnableSequence } from 'langchain/runnables'
import { z } from 'zod'
import { geminiModel } from './geminiModel'
import { ExtendedRecommendationParams, recommendationSchemaWithSeedGenres } from './outputSchema'
import { song_genre } from './promptTemplate'

export const recomendSongParameter = async (
  input: string,
  seedTrack: string | null,
): Promise<ExtendedRecommendationParams> => {
  const parser = StructuredOutputParser.fromZodSchema(recommendationSchemaWithSeedGenres)
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
    explain: input,
    format_parser: parser.getFormatInstructions(),
  })
  //ユーザーが曲を指定した場合は、ジャンルの指定を削除し、シードに指定した曲を追加する
  if (seedTrack) {
    const { seedGenres, ...withoutSeedGenres } = result
    return { ...withoutSeedGenres, seedTracks: [seedTrack] }
  }

  return result
}
