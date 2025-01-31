import { writeFile } from 'node:fs/promises'
import { google } from '@ai-sdk/google'
import resume from '~/assets/resume.json' with { type: 'json' }
import { File } from '#lib/file'
import { compile } from './compile'
import { generate } from './generate'

generate({
  data: resume,
  template: File.RESUME_TEMPLATE,
  model: google('gemini-1.5-flash')
})
  .then(compile)
  .then(it => writeFile(File.RESUME, it))
