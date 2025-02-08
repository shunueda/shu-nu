import { writeFile } from 'node:fs/promises'
import { google } from '@ai-sdk/google'
import { File } from '#lib/file'
import { user } from '#lib/user'
import { compile } from './compile'
import { generate } from './generate'

generate({
  data: user,
  template: File.RESUME_TEMPLATE,
  model: google('gemini-1.5-flash')
})
  .then(compile)
  .then(it => writeFile(File.RESUME, it))
