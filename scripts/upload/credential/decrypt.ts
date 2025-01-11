/**
 * Chrome Cookie Decryption
 * {@see https://gist.github.com/creachadair/937179894a24571ce9860e2475a2d2ec}
 */
import { createDecipheriv, pbkdf2Sync } from 'node:crypto'
import { getPassword } from 'keytar'

// keychain
const service = 'Chrome Safe Storage'
const account = 'Chrome'
const keychain = (await getPassword(service, account)) || 'peanuts'

// decryption parameters
const algorithm = 'aes-128-cbc'
const digest = 'sha1'
const prefix = 'v10'
const padding = 32
const keylen = 16
const iterations = 1003

const iv = Buffer.alloc(16)
const salt = Buffer.from('saltysalt')
const key = pbkdf2Sync(keychain, salt, iterations, keylen, digest)

export function decrypt(cookie: string): string {
  const decipher = createDecipheriv(algorithm, key, iv)
  const encrypted = cookie.slice(prefix.length)
  const data = Buffer.from(encrypted, 'base64')
  return (
    decipher.update(data, undefined, 'utf-8') + decipher.final('utf-8')
  ).slice(padding)
}
