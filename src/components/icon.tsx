import { basename } from 'node:path'
import type { ReactElement } from 'react'
import resume from '~/assets/resume.json' with { type: 'json' }

export function Icon(): ReactElement {
  const username = basename(resume.socials.github)
  return (
    <img
      src={`https://avatars.githubusercontent.com/${username}`}
      style={{
        borderRadius: '15%'
      }}
      alt={username}
    />
  )
}
