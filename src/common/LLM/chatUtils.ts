import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'
import { RunnableSequence } from 'langchain/runnables'
import { getMockFitnessData } from '../fitness/googleFitMock'
import { fitnessOutputSchema } from './fitnessOutputSchema'
import { geminiModel, geminiModelForAnalysis } from './geminiModel'
import {
  ExtendedRecommendationParams,
  recommendationSchemaWithSeedGenres,
} from './recommendOutputSchema'

export const chatUtils = {
  recommendSongParameter: async (
    input: string,
    seedTrack: string | null,
  ): Promise<ExtendedRecommendationParams> => {
    const parser = StructuredOutputParser.fromZodSchema(recommendationSchemaWithSeedGenres)
    const chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(
        '{format_parser}\n以下のJSONデータを元に、その場面に適した曲をレコメンドするためのパラメータを設定し、指定した形式のJSONで返してください.\n{explain}',
      ),
      geminiModel,
      parser,
    ])
    const result = await chain.invoke({
      explain: input,
      format_parser: parser.getFormatInstructions(),
    })
    //ユーザーが曲を指定した場合は、ジャンルの指定を削除し、シードに指定した曲を追加する
    if (seedTrack) {
      const { seedGenres, ...withoutSeedGenres } = result
      return { ...withoutSeedGenres, seedTracks: [seedTrack] }
    }

    return result
  },
  analyzeHealthData: async () => {
    const parser = StructuredOutputParser.fromZodSchema(fitnessOutputSchema)
    const fitnessData = await getMockFitnessData()
    const chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(
        '{format_parser}\n以下のヘルスケアデータを元に、1時間ごとの活動内容を考察し、指定した形式のJSONで返してください.\n{fitnessData}',
      ),
      geminiModelForAnalysis,
      parser,
    ])

    const result = await chain.invoke({
      fitnessData: JSON.stringify(fitnessData),
      format_parser: parser.getFormatInstructions(),
    })
    return result
  },
}
