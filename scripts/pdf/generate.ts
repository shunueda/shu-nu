import type { PathLike } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { type LanguageModel, generateText } from 'ai'
import dedent from 'dedent'

interface Args<T> {
  data: T
  template: PathLike
  model: LanguageModel
}

export async function generate<T>({
  data,
  template,
  model
}: Args<T>): Promise<string> {
  const prompt = dedent`
    Convert the provided resume information into a LaTeX document.

    Steps:
     1: Parse the provided resume JSON and the LaTeX template.
     2: Populate the LaTeX template with the resume information.

    Important:
     - Only output the LaTeX code. No Markdown syntax is required.
     - Escape special characters properly (e.g., #, %, &, etc.).
     - Use the resume information accurately.
     - Remove all comments from the LaTeX template.

    Resume:
    ${JSON.stringify(data)}

    Template:
    ${await readFile(template, 'utf-8')}
  `
  const { text } = await generateText({ model, prompt })
  return text
}
