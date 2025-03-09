import { track } from '@vercel/analytics/server'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { HTMLAttributeAnchorTarget, ReactElement } from 'react'
import icon from '/public/icon.svg'
import { File } from '#lib/file'
import { publicFile } from '#lib/utils'

interface Item {
  readonly label: string
  readonly href: Route
  readonly target?: HTMLAttributeAnchorTarget
}

const items: Item[] = [
  {
    label: 'home',
    href: '/'
  },
  {
    label: 'resume',
    href: publicFile(File.RESUME),
    target: '_blank'
  }
]

export async function Nav(): Promise<ReactElement> {
  return (
    <nav className='flex gap-6 py-12'>
      <div className='relative my-auto size-5'>
        <Image src={icon} alt={icon} fill />
      </div>
      {items.map(({ href, label, target }) => (
        <Link
          className='text-gray-700'
          href={href}
          target={target}
          key={label}
          onClick={async (): Promise<void> => {
            'use server'
            await track(label)
          }}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
