import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { ReactNode } from 'react'
import { Footer } from '#components/footer'
import { Nav } from '#components/nav'
import { cn } from '#lib/utils'
import classes from './layout.module.scss'

export const metadata: Metadata = {
  title: 'Shun Ueda',
  description: `Shun Ueda's website`,
}

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={cn(GeistSans.variable, GeistMono.variable, 'antialiased')}
      >
        <main className={classes.main}>
          <Nav />
          {children}
          <Footer />
        </main>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
