import { writeFile } from 'node:fs/promises'
import React, { createElement } from 'react'
import satori from 'satori'
import sharp from 'sharp'
import toIco from 'to-ico'
import { Icon } from '#components/icon'
import { File } from '#lib/file'

// polyfill to use JSX in node
globalThis.React = React

const size = 256

const svg = await satori(createElement(Icon), {
  width: size,
  height: size,
  fonts: []
}).then(it => new TextEncoder().encode(it))

const png = await sharp(svg).png().toBuffer()

const ico = await toIco(png, {
  resize: true
})

await Promise.all([
  writeFile(File.ICON_SVG, svg),
  writeFile(File.ICON_PNG, png),
  writeFile(File.FAVICON, ico)
])
