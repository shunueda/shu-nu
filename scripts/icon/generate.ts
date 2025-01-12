import React, { createElement } from 'react'
import satori from 'satori'
import { Icon } from '#components/icon'

// patch to use JSX in node
globalThis.React = React

export async function generate(size: number) {
  return satori(createElement(Icon), {
    width: size,
    height: size,
    fonts: []
  })
}
