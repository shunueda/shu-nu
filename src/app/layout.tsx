import './globals.css'
import { EOL } from 'node:os'
import type { Metadata } from 'next'
import config from '#assets/config.json'
import { Lang } from '#lib/i18n'
import type { LayoutProps } from '#types/props'

export const metadata: Metadata = {
  title: config.name,
  description: Object.values(config.introduction)
    .map(it => it.join(' '))
    .join(EOL),
  alternates: {
    canonical: '/',
    languages: {
      [Lang.EN]: `/${Lang.EN}`,
      [Lang.JA]: `/${Lang.JA}`,
    },
  },
}

export default function Layout({ children }: LayoutProps) {
  return children
}
