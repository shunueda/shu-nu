import { readFile } from 'node:fs/promises'
import { parse } from 'node:path'
import { createElement } from 'react'
import satori from 'satori'
import { Icon } from '#components/icon'

const path = 'node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf'
const { buffer } = await readFile(path)

export async function createIconSvg(size: number) {
  return satori(
    createElement(Icon, {
      size
    }),
    {
      width: size,
      height: size,
      fonts: [
        {
          ...parse(path),
          data: buffer
        }
      ]
    }
  )
}
