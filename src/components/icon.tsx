// biome-ignore lint/correctness/noUnusedImports: required for script
import React from 'react'

interface Props {
  size: number
}

export function Icon({ size }: Props) {
  return (
    <section
      lang="ja-JP"
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20%',
        background:
          'linear-gradient(60deg, rgba(110,179,204,1) 0%, rgba(224,162,224,1) 100%)'
      }}
    >
      <div
        style={{
          color: '#eeeeee',
          fontSize: `${size * 0.6}px`
        }}
      >
        :)
      </div>
    </section>
  )
}
