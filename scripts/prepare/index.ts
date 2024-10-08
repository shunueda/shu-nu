import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { EOL } from 'node:os'
import { parseEnv } from 'node:util'
import { $ } from 'zx'

const envFile = '.env.local'

const env = existsSync(envFile)
  ? parseEnv(readFileSync(envFile).toString())
  : process.env // vercel

writeFileSync('environment.d.ts', createDts(env))

await $`lefthook install`

function createDts(env: object) {
  return `
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
}
