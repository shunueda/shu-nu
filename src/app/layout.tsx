import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Footer } from '#components/footer'
import { Nav } from '#components/nav'
import { cn } from '#lib/utils'
import profile from '../assets/config.json'
import { useI18n } from '../lib/i18n'
import classes from './layout.module.scss'

interface Props {
  children: ReactNode
}

export async function generateMetadata() {
  return {
    title: await useI18n(profile.name),
    description: (await useI18n(profile.introduction)).join(' '),
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  } satisfies Metadata
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
