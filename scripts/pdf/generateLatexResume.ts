import generateContent from '@/utils/generateContent'

export default async function generateLatexResume(
  input: string,
  template: string
) {
  const prompt = `
    Your task is to convert a resume from markdown format into a LaTeX document using a provided LaTeX template.
    
    Follow these steps:
    
    Step 1: Read the resume information provided in markdown format.
    Step 2: Read the provided LaTeX template.
    Step 3: Convert the markdown resume into a LaTeX document using the template.
    Step 4: Ensure all special characters are properly escaped.
    Step 5: Use the resume information accurately, but correct any errors or confusing sentences.
    Step 6: Make improvements to the resume where possible to enhance clarity and presentation.
    
    The markdown resume and LaTeX template are provided below, surrounded by triple quotes.
    
    Resume in markdown:
    """
    ${input}
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
  return generateContent(prompt)
}
