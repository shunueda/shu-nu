import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, parse } from 'node:path'
import satori from 'satori'
import sharp from 'sharp'
import toIco from 'to-ico'
import { createElement } from './createElement'

const sizes = [16, 32, 48, 64]

const paths = {
  font: 'node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf',
  out: 'out',
  favicon: 'src/app/favicon.ico'
}

await mkdir(paths.out, {
  recursive: true
})

async function createSvg(size: number) {
  return satori(createElement(size), {
    width: size,
    height: size,
    fonts: [
      {
        ...parse(paths.font),
        data: (await readFile(paths.font)).buffer
      }
    ]
  })
}

await writeFile(join(paths.out, 'favicon.svg'), await createSvg(512))

const pngs = await Promise.all(
  sizes.map(async size => {
    const svg = await createSvg(size)
    return new Promise<Buffer>(resolve => {
      sharp(Buffer.from(svg))
        .png()
        .toBuffer((_, buffer) => {
          resolve(buffer)
        })
    })
  })
)

await writeFile(paths.favicon, await toIco(pngs))
