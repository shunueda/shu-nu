import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

export async function generate(input: object, template: string) {
  const prompt = `
    Your task is to convert a resume from json format into a LaTeX document using a provided LaTeX template.
    
    Follow these steps:
    
    Step 1: Read the resume information provided in json format.
    Step 2: Read the provided LaTeX template.
    Step 3: Convert the json resume into a LaTeX document using the template.
    Step 4: Ensure all special characters are properly escaped.
    Step 5: Use the resume information accurately, but correct any errors or confusing sentences.
    Step 6: Make improvements to the resume where possible to enhance clarity and presentation.
    Step 7: Do not include codeblock or any other markdown syntax in the LaTeX output.
    
    The json resume and LaTeX template are provided below, surrounded by triple quotes.
    
    Resume in json:
    """
    ${JSON.stringify(input, null, 2)}
    """
    
    LaTeX template:
    """
    ${template}
    """
    
    Important:
    - Do not output any instructions or notes; only output the LaTeX code.
    - Ensure the final output is a clean, formatted LaTeX document.
    - Make sure to escape special characters properly.
    
    Please begin the conversion now.
  `
  const { text } = await generateText({
    model: google('gemini-1.5-flash'),
    prompt
  })
  return text
}
