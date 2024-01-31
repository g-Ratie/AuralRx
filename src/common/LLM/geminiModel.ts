import { GEMINI_API_KEY } from '@/service/envValues'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

//レコメンドパラメータ生成用のランダム性を無くしたモデル
export const geminiModel = new ChatGoogleGenerativeAI({
  modelName: 'gemini-pro',
  maxOutputTokens: 8192,
  temperature: 0,
  apiKey: GEMINI_API_KEY,
})

//柔軟な思考ができるように、ランダム性を強めに持たせたモデル
export const geminiModelForAnalysis = new ChatGoogleGenerativeAI({
  modelName: 'gemini-pro',
  maxOutputTokens: 8192,
  temperature: 0.6,
  apiKey: GEMINI_API_KEY,
})
