import { mkdir, writeFile } from 'node:fs/promises'
import React, { createElement } from 'react'
import satori from 'satori'
import sharp from 'sharp'
import toIco from 'to-ico'
import { Icon } from '#components/icon'

// polyfill to use JSX in node
globalThis.React = React

const out = 'public'
const sizes = [16, 24, 32, 48, 64, 128, 256] as const
const faviconPath = 'src/app/favicon.ico'

await mkdir(out)

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
      await writeFile(`${out}/icon.svg`, svg)
      await writeFile(`${out}/icon.png`, png)
    }
    return png
  })
)

await writeFile(faviconPath, await toIco(pngs))
