import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { EOL } from 'node:os'
import { parseEnv } from 'node:util'

const envFile = '.env.local'

if (!existsSync(envFile)) {
  console.error(`No ${envFile} file found!`)
  process.exit(1)
}

const content = readFileSync(envFile).toString()
const env = parseEnv(content)
const dts = `
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ${Object.keys(env)
        .map(key => `${key}: string`)
        .join(`${EOL}      `)}
    }
  }
}

export {}
`

writeFileSync('environment.d.ts', dts)
