import './globals.css'
import { EOL } from 'node:os'
import type { Metadata } from 'next'
import pkg from '~/package.json'
import { i18nConfig } from '#i18n-config'
import { langs } from '#lib/i18n'
import type { LayoutProps } from '#types/props'

export const metadata: Metadata = {
  title: pkg.name,
  description: Object.values(i18nConfig.introduction)
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
