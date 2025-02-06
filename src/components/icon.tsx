import type { ReactElement } from 'react'

export function Icon(): ReactElement {
  return (
    <img
      src={'https://avatars.githubusercontent.com/shunueda'}
      style={{
        borderRadius: '15%'
      }}
      alt={Icon.name}
    />
  )
}
