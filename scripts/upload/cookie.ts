import { homedir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { decrypt } from './decrypt'

const path = join(
  homedir(),
  'Library/Application Support/Google/Chrome/Default/Cookies'
)

const db = new DatabaseSync(path)

const query = db.prepare(`
    SELECT encrypted_value
    FROM cookies
    WHERE host_key = ?
      AND name = ?
`)

export function getChromeCookie(host: string, name: string): string {
  const { encrypted_value } = query.get(host, name) as {
    encrypted_value: Uint8Array
  }
  return decrypt(encrypted_value)
}
