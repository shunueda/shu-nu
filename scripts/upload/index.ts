import { openAsBlob } from 'node:fs'
import { EOL } from 'node:os'
import { setTimeout } from 'node:timers/promises'
import { experiences } from '~/assets/resume.json' with { type: 'json' }
import { readCredentials } from './credential/cookie'
import { Endpoint } from './endpoint'

const filename = 'Shun_Ueda_Resume.pdf'

const { authorization, csrf } = readCredentials()
const headers = {
  Cookie: `authorization=${authorization}`,
  'X-CSRF-TOKEN': csrf
} as const

const blob = await openAsBlob(`public/${filename}`, {
  type: 'application/pdf'
})

const formdata = new FormData()
formdata.append('name', filename)
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
