import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { HTMLAttributeAnchorTarget, ReactElement } from 'react'
import icon from '/public/icon.svg'
import { File } from '#lib/file'
import { publicFile } from '#lib/utils'

interface Item {
  label: string
  href: Route
  target?: HTMLAttributeAnchorTarget
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
    <nav className='pt-12 pb-12 flex gap-6'>
      <div className='relative w-5 h-5 my-auto'>
        <Image src={icon} alt={icon} fill />
      </div>
      {items.map(({ href, label, target }) => (
        <Link className='text-gray-700' href={href} target={target} key={label}>
          {label}
        </Link>
      ))}
    </nav>
  )
}
