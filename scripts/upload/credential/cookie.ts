import { homedir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import type { Credential, Row } from '../types'
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

export function readCredentials(): Credential {
  const { encrypted_value: authorization } = query.get('authorization') as Row
  const { encrypted_value: csrf } = query.get('csrf') as Row
  return {
    authorization: decrypt(authorization),
    csrf: decrypt(csrf)
  } as const
}
