import { writeFile } from 'node:fs/promises'
import React, { createElement } from 'react'
import satori from 'satori'
import sharp from 'sharp'
import toIco from 'to-ico'
import { Icon } from '#components/icon'
import { File } from '#lib/file'

// polyfill to use JSX in node
globalThis.React = React

const sizes = [16, 24, 32, 48, 64, 128, 256] as const

Promise.all(
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
      await writeFile(File.ICON_SVG, svg)
      await writeFile(File.ICON_PNG, png)
    }
    return png
  })
)
  .then(toIco)
  .then(buffer => writeFile(File.FAVICON, buffer))
