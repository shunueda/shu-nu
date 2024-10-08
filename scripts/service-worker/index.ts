import { writeFile } from 'node:fs/promises'
import { transformFile } from '@swc/core'
import { config } from '#config'

const input = `src/${config.serviceWorker}.ts`
const output = `public/${config.serviceWorker}.js`

const { code } = await transformFile(input, {
  jsc: {
    target: 'es2018'
  },
  module: {
    type: 'es6'
  },
  minify: true
})

await writeFile(output, code.replaceAll('export', ''))
