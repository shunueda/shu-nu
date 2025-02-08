import type { ReactElement } from 'react'
import { user } from '#lib/user'

export function Icon(): ReactElement {
  return (
    <img
      src={user.avatar_url}
      style={{
        borderRadius: '15%'
      }}
      alt={Icon.name}
    />
  )
}
