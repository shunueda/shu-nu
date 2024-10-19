import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { transformFile } from '@swc/core'

const pub = 'public'
const serviceWorker = 'service-worker'

await mkdir(pub, {
  recursive: true
})

const src = join('src', `${serviceWorker}.ts`)
const out = join(pub, `${serviceWorker}.js`)

const { code } = await transformFile(src, {
  jsc: {
    target: 'es2018'
  },
  module: {
    type: 'es6'
  },
  minify: true
})

await writeFile(out, code)
