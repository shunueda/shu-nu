import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { parse } from 'node:path'
import satori from 'satori'
import sharp from 'sharp'
import toIco from 'to-ico'
import { createElement } from './createElement'

const sizes = [16, 32, 48, 64]

const paths = {
  font: 'node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf',
  favicon: 'src/app/favicon.ico',
}

const pngs = await Promise.all(
  sizes.map(async size => {
    const svg = await satori(createElement(size), {
      width: size,
      height: size,
      fonts: [
        {
          ...parse(paths.font),
          data: readFileSync(paths.font).buffer,
        },
      ],
    })
    return new Promise<Buffer>(resolve => {
      sharp(Buffer.from(svg))
        .png()
        .toBuffer((_, buffer) => {
          resolve(buffer)
        })
    })
  }),
)

const ico = await toIco(pngs)
writeFileSync(paths.favicon, ico)
