import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { ReactNode } from 'react'
import { Footer } from '../../components/footer'
import { Nav } from '../../components/nav'
import { type Lang, langs } from '../../lib/i18n'
import { cn } from '../../lib/utils'
import classes from './layout.module.scss'

interface Props {
  children: ReactNode
  params: Promise<{
    lang: Lang
  }>
}

export async function generateStaticParams() {
  return langs.map(lang => ({ lang }))
}

export default async function Layout({ children, params }: Props) {
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
