import Navbar from '@/components/Navbar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { clsx } from 'clsx'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { ReactNode } from 'react'
import './global.scss'

interface Props {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang='en'
      className={clsx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className='antialiased max-w-xl mx-4 mt-8 lg:mx-auto'>
        <main className='flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0'>
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
