import { createDecipheriv, pbkdf2Sync } from 'node:crypto'
import { getPassword } from 'keytar'

const service = 'Chrome Safe Storage'
const account = 'Chrome'
const safestorepass = (await getPassword(service, account)) as string

const algorithm = 'aes-128-cbc'
const padding = 32
const keylen = 16
const iterations = 1003
const digest = 'sha1'
const prefix = 'v10'
const iv = Buffer.alloc(16)
const salt = Buffer.from('saltysalt')
const key = pbkdf2Sync(safestorepass, salt, iterations, keylen, digest)

export function decrypt(cookie: string): string {
  const decipher = createDecipheriv(algorithm, key, iv)
  const data = Buffer.from(cookie.slice(prefix.length), 'base64')
  return (
    decipher.update(data, undefined, 'utf8') + decipher.final('utf8')
  ).slice(padding)
}
