import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { transformFile } from '@swc/core'
import { config } from '#config'

const pub = 'public'

await mkdir(pub, {
  recursive: true
})

const src = join('src', `${config.serviceWorker}.ts`)
const out = join(pub, `${config.serviceWorker}.js`)

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
