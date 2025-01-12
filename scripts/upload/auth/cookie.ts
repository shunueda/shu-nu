import { homedir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { Cookie } from '#lib/cookie'
import { decrypt } from './decrypt'
import type { CookieRow, Credential } from './types'

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

export function readCredentials(): Credential {
  return {
    authorization: decrypt(
      (query.get(Cookie.AUTHORIZATION) as CookieRow).encrypted_value
    ),
    csrf: decrypt((query.get(Cookie.CSRF) as CookieRow).encrypted_value)
  } as const
}
