import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { google } from '@ai-sdk/google'
import { $ } from 'zx'
import resume from '~/public/resume.json'
import { generate } from './generate'

const dir = 'public'
const tex = 'Shun_Ueda_Resume.tex'
const template = 'template.tex'

const generated = await generate({
  resume,
  template: join(dir, template),
  model: google('gemini-1.5-flash'),
  keywords: process.argv.slice(2)
})

await writeFile(join(dir, tex), generated)

await $({ cwd: dir })`pdflatex ${tex} && latexmk -c -quiet`
