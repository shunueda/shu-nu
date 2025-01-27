import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { google } from '@ai-sdk/google'
import resume from '~/assets/resume.json' with { type: 'json' }
import { File } from '#lib/file'
import { compile } from './compile'
import { generate } from './generate'

const out = join('public', File.RESUME)

generate({
  data: resume,
  template: 'assets/template.tex',
  model: google('gemini-1.5-flash')
})
  .then(compile)
  .then(it => writeFile(out, it))
