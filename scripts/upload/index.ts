import { openAsBlob } from 'node:fs'
import { EOL } from 'node:os'
import { setTimeout } from 'node:timers/promises'
import { experiences } from '~/assets/resume.json' with { type: 'json' }
import { File } from '#lib/file'
import { Header } from '#lib/header'
import { readCredentials } from './credential/cookie'
import { Endpoint } from './endpoint'

const pdf = `${File.RESUME}.pdf`

const { authorization, csrf } = readCredentials()
const headers = {
  [Header.COOKIE]: `authorization=${authorization}`,
  [Header.X_CSRF_TOKEN]: csrf
} as const

const blob = await openAsBlob(`public/${pdf}`, {
  type: 'application/pdf'
})

const formdata = new FormData()
formdata.append('name', pdf)
formdata.append('file', blob)

await fetch(Endpoint.RESUME, {
  method: 'POST',
  headers,
  body: formdata
})

for (const experience of experiences) {
  await setTimeout(1000)
  await fetch(`${Endpoint.EXPERIENCE}/${experience.simplify_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify({
      description: experience.descriptions.map(it => `• ${it}`).join(EOL)
    })
  })
}
