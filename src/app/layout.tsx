import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import type { ReactElement } from 'react'
import resume from '~/assets/resume.json' with { type: 'json' }
import { Footer } from '#components/footer'
import { Nav } from '#components/nav'
import type { LayoutProps } from '#types'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: resume.name
  } satisfies Metadata
}

const geist = Geist({
  subsets: ['latin']
})

export default async function Layout({
  children
}: LayoutProps): Promise<ReactElement> {
  return (
    <html lang='en' className={geist.className}>
      <body>
        <main className='mx-auto mt-8 w-10/12 max-w-xl'>
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
