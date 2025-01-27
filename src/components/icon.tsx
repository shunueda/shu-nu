import type { ReactElement } from 'react'
import pkg from '~/package.json' with { type: 'json' }

export function Icon(): ReactElement {
  return (
    <img
      src={`https://avatars.githubusercontent.com/${pkg.author.username}`}
      style={{
        borderRadius: '15%'
      }}
      alt={Icon.name}
    />
  )
}
