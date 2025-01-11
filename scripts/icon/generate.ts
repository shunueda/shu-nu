import { createElement } from 'react'
import satori from 'satori'
import { Icon } from '#components/icon'

export async function generate(size: number) {
  return satori(createElement(Icon), {
    width: size,
    height: size,
    fonts: []
  })
}
