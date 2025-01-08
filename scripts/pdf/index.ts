import { rm, writeFile } from 'node:fs/promises'
import { basename, dirname } from 'node:path'
import { google } from '@ai-sdk/google'
import { $ } from 'zx'
import resume from '~/assets/resume.json'
import { generate } from './generate'

const out = 'public/Shun_Ueda_Resume.tex'

const generated = await generate({
  resume,
  template: 'assets/template.tex',
  model: google('gemini-1.5-flash'),
  keywords: process.argv.slice(2)
})

await writeFile(out, generated)

await $({ cwd: dirname(out) })`pdflatex ${basename(out)} && latexmk -c -quiet`

await rm(out)
