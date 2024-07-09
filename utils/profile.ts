import { Profile } from '@/models/Profile'
import generateContent from '@/utils/generateContent'
import getNotionResumeAsMd from '@/utils/getNotionResumeAsMd'

const prompt = `
  Parse the following Markdown content into a provided json schema.
  
  """
  ${await getNotionResumeAsMd()}
  """
  
  """
  export interface Profile {
    name: string
    email: string
    linkedin: string
    github: string
    experiences: Experience[]
  }

  interface Experience {
    company: string
    title: string
    start: string
    end: string
  }
  """
  
  Important:
    - Do not output any instructions or notes; only output the JSON object, as a string.
    - The output should be a JSON object that matches the provided schema.
    - Your output will be directly parsed into a JSON using JSON.parse, so do not include any additional information.
    - Do not include the triple quotes in the output.
`

export const profile = JSON.parse(await generateContent(prompt)) as Profile
