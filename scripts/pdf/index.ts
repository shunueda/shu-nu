import { rm, writeFile } from 'node:fs/promises'
import { basename, dirname } from 'node:path'
import { google } from '@ai-sdk/google'
import { $ } from 'zx'
import resume from '~/assets/resume.json' with { type: 'json' }
import { generate } from './generate'

export const filename = 'Shun_Ueda_Resume'

const out = `public/${filename}.tex`

const generated = await generate({
  resume,
  template: 'assets/template.tex',
  model: google('gemini-1.5-flash')
})

await writeFile(out, generated)

await $({ cwd: dirname(out) })`pdflatex ${basename(out)} && latexmk -c -quiet`

await rm(out)
