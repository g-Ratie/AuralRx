import { GEMINI_API_KEY } from '@/common/envValues'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

export const geminiModel = new ChatGoogleGenerativeAI({
  modelName: 'gemini-pro',
  maxOutputTokens: 2048,
  temperature: 0,
  topP: 0.1,
  apiKey: GEMINI_API_KEY,
})
