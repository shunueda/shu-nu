import { writeFile } from 'node:fs/promises'
import { google } from '@ai-sdk/google'
import { pipe } from 'effect'
import resume from '~/assets/resume.json' with { type: 'json' }
import { File } from '#lib/file'
import { compile } from './compile'
import { generate } from './generate'

const out = `public/${File.RESUME}.pdf`

await pipe(
  await generate({
    resume,
    template: 'assets/template.tex',
    model: google('gemini-1.5-flash')
  }),
  compile,
  async it => Buffer.from(await it),
  async it => writeFile(out, await it)
)
