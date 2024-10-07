import { writeFile } from 'node:fs/promises'
import swc from '@swc/core'
import { config } from '#config'

const input = `src/${config.serviceWorker}.ts`
const output = `public/${config.serviceWorker}.js`

const { code } = await swc.transformFile(input, {
  minify: true
})

await writeFile(output, code)
