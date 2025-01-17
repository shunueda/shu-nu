import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import type { ReactElement, ReactNode } from 'react'
import pkg from '~/package.json' with { type: 'json' }
import { Footer } from '#components/footer'
import { Nav } from '#components/nav'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: `${pkg.author.name} - %s`,
      default: pkg.author.name
    }
  } satisfies Metadata
}

export interface Props {
  children: ReactNode
}

export default async function Layout({
  children
}: Props): Promise<ReactElement> {
  return (
    <html lang='en' className={GeistSans.className}>
      <body>
        <main className='mt-8 mx-auto max-w-xl w-10/12'>
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
