import { GEMINI_API_KEY } from '@/service/envValues'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

//レコメンド用の通常モデル
export const geminiModel = new ChatGoogleGenerativeAI({
  modelName: 'gemini-pro',
  maxOutputTokens: 8192,
  temperature: 0,
  apiKey: GEMINI_API_KEY,
})

//柔軟な思考ができるように、ランダム性を持たせたモデル
export const geminiModelForAnalysis = new ChatGoogleGenerativeAI({
  modelName: 'gemini-pro',
  maxOutputTokens: 8192,
  temperature: 0.6,
  apiKey: GEMINI_API_KEY,
})
