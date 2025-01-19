import { openAsBlob } from 'node:fs'
import { EOL } from 'node:os'
import { join } from 'node:path'
import { setTimeout } from 'node:timers/promises'
import { experiences } from '~/assets/resume.json' with { type: 'json' }
import { File } from '#lib/file'
import { readChromeCookie } from './cookie'
import { Endpoint } from './endpoint'

const host = '.simplify.jobs'

const headers = {
  Cookie: `authorization=${readChromeCookie(host, 'authorization')}`,
  'X-CSRF-TOKEN': readChromeCookie(host, 'csrf')
} as const

const blob = await openAsBlob(join('public', File.RESUME), {
  type: 'application/pdf'
})

const body = new FormData()
body.append('name', File.RESUME)
body.append('file', blob)

await fetch(Endpoint.RESUME, {
  method: 'POST',
  headers,
  body
})

for (const experience of experiences) {
  await setTimeout(500)
  await fetch(`${Endpoint.EXPERIENCE}/${experience.simplify_id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: experience.descriptions.map(it => `• ${it}`).join(EOL)
    })
  })
}
