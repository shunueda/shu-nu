// biome-ignore lint/correctness/noUnusedImports: required for script
import React from 'react'

import { parse } from 'node:path'
import satori from 'satori'

const fontUrl =
  'https://github.com/vercel/geist-font/raw/refs/heads/main/out/proof/Geist-Bold.ttf'
const fontData = await fetch(fontUrl).then(it => it.arrayBuffer())

export async function createIconSvg(size: number) {
  return satori(createElement(size), {
    width: size,
    height: size,
    fonts: [
      {
        ...parse(fontUrl),
        data: fontData
      }
    ]
  })
}

export function createElement(size: number) {
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
