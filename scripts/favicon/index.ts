import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'
import toIco from 'to-ico'
import { createIconSvg } from '#lib/icon'

const sizes = [16, 32, 48, 64]
const faviconPath = 'src/app/favicon.ico'

const pngs = await Promise.all(
  sizes.map(async size => {
    const svg = await createIconSvg(size)
    const buffer = Buffer.from(svg)
    return sharp(buffer).png().toBuffer()
  })
)

await writeFile(faviconPath, await toIco(pngs))
