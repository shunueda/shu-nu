import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import config from '#assets/config.json'
import { Footer } from '#components/footer'
import { Nav } from '#components/nav'
import { langs, useI18nElement } from '#lib/i18n'
import { cn } from '#lib/utils'
import type { LayoutProps } from '#types/props'
import classes from './layout.module.scss'
import type { Props } from './page'

export async function generateStaticParams() {
  return langs.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  return {
    title: config.name,
    description: useI18nElement(config.blog.description, lang)
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
