import type { ReactElement } from 'react'
import { avatar_url } from '#lib/user'

export function Icon(): ReactElement {
  return (
    <img
      src={avatar_url}
      style={{
        borderRadius: '15%'
      }}
      alt={Icon.name}
    />
  )
}
