import { GoogleGenerativeAI } from '@google/generative-ai'

const generativeModel = new GoogleGenerativeAI(
  process.env.GOOGLE_API_KEY
).getGenerativeModel({
  model: 'gemini-1.5-flash-latest'
})

export default async function generateContent(prompt: string) {
  const content = await generativeModel.generateContent(prompt)
  return content.response.text()
}
