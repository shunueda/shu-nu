import { readFile } from 'node:fs/promises'
import { type LanguageModel, generateText } from 'ai'
import dedent from 'dedent'

interface Args<T> {
  resume: T
  template: string
  model: LanguageModel
  keywords: string[]
}

export async function generate<T>({
  resume,
  template,
  model,
  keywords
}: Args<T>) {
  const prompt = dedent`
    Convert the provided resume information into a LaTeX document.

    Steps:
     1: Parse the provided resume JSON and the LaTeX template.
     2: Populate the LaTeX template with the resume information, integrating the keywords dynamically.

    Important:
     - Only output the LaTeX code. No Markdown syntax is required.
     - Escape special characters properly (e.g., #, %, &, etc.).
     - Use the resume information and keywords accurately.
     - Remove all comments from the LaTeX template.
     - Ensure the keywords are integrated naturally into the skills section.

    Resume:
    ${JSON.stringify(resume, null, 2)}

    Keywords:
    [${keywords.join(', ')}]

    Template:
    ${await readFile(template, 'utf-8')}
  `
  const { text } = await generateText({ model, prompt })
  return text
}
