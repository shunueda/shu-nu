import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

export async function generate(input: object, template: string) {
  const prompt = `
    Your task is to convert a resume from json format into a LaTeX document using a provided LaTeX template.
    
    Follow these steps:
    Step 1: Read the resume information provided in json format.
    Step 2: Read the provided LaTeX template.
    Step 3: Convert the json resume into a LaTeX document using the template.
    
    Important:
     - DO NOT output any instructions or notes; only output the LaTeX code.
     - DO NOT include codeblock or any other markdown syntax in the LaTeX output.
     - You MUST ensure to escape special characters (e.g. #, %, etc.) properly.
     - Use the resume information accurately.
     - You may remove the comments from the LaTeX template.
     - For technical skills section, use the provided LaTeX template, marked with "TECHNICAL SKILLS".
    
    The json resume and LaTeX template are provided below, surrounded by triple quotes.
    
    Resume in json:
    """
    ${JSON.stringify(input).replaceAll('https://', '')}
    """
    
    LaTeX template:
    """
    ${template}
    """
    
    Please begin the conversion now.
  `
  const { text } = await generateText({
    model: google('gemini-1.5-flash'),
    prompt
  })
  return text
}
