import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import pkg from '~/package.json'
import { Footer } from '#components/footer'
import { Nav } from '#components/nav'
import { i18nConfig } from '#i18n-config'
import { type Lang, langs, useI18nElement } from '#lib/i18n'
import { cn } from '#lib/utils'
import type { LayoutProps } from '#types/props'
import classes from './layout.module.scss'

export interface Props {
  params: Promise<{
    lang: Lang
  }>
}

export async function generateStaticParams() {
  return langs.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  return {
    title: pkg.name,
    description: useI18nElement(i18nConfig.blog.description, lang)
  } satisfies Metadata
}

export default async function Layout({
  children,
  params
}: LayoutProps & Props) {
  const { lang } = await params
  return (
    <html lang={lang}>
      <body
        className={cn(GeistSans.variable, GeistMono.variable, 'antialiased')}
      >
        <main className={classes.main}>
          <Nav lang={lang} />
          {children}
          <Footer />
        </main>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
