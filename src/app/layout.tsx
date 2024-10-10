import './globals.css'
import { EOL } from 'node:os'
import type { Metadata } from 'next'
import { config } from '#config'
import { i18n } from '#i18n'
import { langs } from '#lib/i18n'
import type { LayoutProps } from '#types/props'

export const metadata: Metadata = {
  title: config.name,
  description: Object.values(i18n.introduction)
    .map(it => it.join(' '))
    .join(EOL),
  alternates: {
    canonical: '/',
    languages: Object.fromEntries(langs.map(lang => [lang, `/${lang}`]))
  }
}

export default function Layout({ children }: LayoutProps) {
  return children
}
