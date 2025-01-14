import { homedir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { Cookie } from '#lib/cookie'
import { decrypt } from './decrypt'

const host = '.simplify.jobs'

const path = join(
  homedir(),
  'Library/Application Support/Google/Chrome/Default/Cookies'
)

const query = new DatabaseSync(path).prepare(`
    SELECT name,
           CAST(encrypted_value AS BLOB) AS encrypted_value
    FROM cookies
    WHERE host_key = '${host}'
      AND name = ?
`)

function readEncryptedValue(name: string) {
  return decrypt(
    (
      query.get(name) as {
        encrypted_value: Uint8Array
      }
    ).encrypted_value
  )
}

export function readCookie() {
  return {
    authorization: readEncryptedValue(Cookie.AUTHORIZATION),
    csrf: readEncryptedValue(Cookie.CSRF)
  } as const
}