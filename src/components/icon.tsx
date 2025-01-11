// biome-ignore lint/correctness/noUnusedImports: required for script
import React from 'react'

const src = 'https://avatars.githubusercontent.com/u/62182668'

export function Icon() {
  return (
    <img
      src={src}
      style={{
        borderRadius: '20%'
      }}
      alt={Icon.name}
    />
  )
}
