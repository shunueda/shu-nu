/**
 * Chrome Cookie Decryption
 * {@see https://gist.github.com/creachadair/937179894a24571ce9860e2475a2d2ec}
 */
import { createDecipheriv, pbkdf2Sync } from 'node:crypto'
import { getPassword } from 'keytar'

// keychain
const service = 'Chrome Safe Storage'
const account = 'Chrome'
const keychain = await getPassword(service, account)

// decryption parameters
const algorithm = 'aes-128-cbc'
const digest = 'sha1'
const iterations = 1003
const ivlen = 16
const keylen = 16
const padding = 32
const prefix = 'v10'
const salt = 'saltysalt'

// biome-ignore lint/style/noNonNullAssertion: Keychain exists
const key = pbkdf2Sync(keychain!, salt, iterations, keylen, digest)

export function decrypt(cookie: Uint8Array): string {
  const iv = Buffer.alloc(ivlen)
  const decipher = createDecipheriv(algorithm, key, iv)
  const encrypted = cookie.slice(prefix.length)
  return (decipher.update(encrypted) + decipher.final('utf-8')).slice(padding)
}
