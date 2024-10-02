import './globals.css'
import { EOL } from 'node:os'
import type { Metadata } from 'next'
import config from '#assets/config.json'
import type { LayoutProps } from '#types/props'

export const metadata: Metadata = {
  title: config.name,
  description: Object.values(config.introduction)
    .map(it => it.join(' '))
    .join(EOL),
}

export default function Layout({ children }: LayoutProps) {
  return children
}
