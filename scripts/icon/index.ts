import { writeFile } from 'node:fs/promises'
import React, { createElement } from 'react'
import satori from 'satori'
import sharp from 'sharp'
import toIco from 'to-ico'
import { Icon } from '#components/icon'

// polyfill to use JSX in node
globalThis.React = React

const sizes = [16, 24, 32, 48, 64, 128, 256] as const
const favicon = 'src/app/favicon.ico'

const pngs = await Promise.all(
  sizes.map(async size => {
    const svg = await satori(createElement(Icon), {
      width: size,
      height: size,
      fonts: []
    })
    const buffer = Buffer.from(svg)
    const png = await sharp(buffer).png().toBuffer()
    // save icon files
    if (size === sizes.at(-1)) {
      await writeFile('public/icon.svg', svg)
      await writeFile('public/icon.png', png)
    }
    return png
  })
)

const icon = await toIco(pngs)
await writeFile(favicon, icon)
