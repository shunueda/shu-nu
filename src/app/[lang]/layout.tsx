import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import pkg from '~package.json'
import { Footer } from '#components/footer'
import { Nav } from '#components/nav'
import { type Lang, langs } from '#lib/i18n'
import { cn } from '#lib/utils'
import type { LayoutProps, StaticParams } from '#types/props'

export interface Props {
  params: Promise<{
    lang: Lang
  }>
}

export async function generateStaticParams(): StaticParams<Props> {
  return langs.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: Props) {
  return {
    title: {
      template: `${pkg.author.name} - %s`,
      default: pkg.author.name
    }
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
        <main className='mt-8 mx-auto max-w-xl w-10/12'>
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
