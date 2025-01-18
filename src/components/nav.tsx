import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import icon from '/public/icon.svg'
import { File } from '#lib/file'

interface NavItem {
  label: string
  href: Route
  newTab?: boolean
}

const items: NavItem[] = [
  {
    label: 'home',
    href: '/'
  },
  {
    label: 'resume',
    href: `/${File.RESUME}` as Route,
    newTab: true
  }
]

export function Nav() {
  return (
    <nav className='pt-12 pb-12 flex gap-6'>
      <div className='relative w-5 h-5 my-auto'>
        <Image src={icon} alt='icon' fill />
      </div>
      {items.map(({ href, label, newTab }) => (
        <Link
          className='text-gray-700 '
          href={href}
          key={href}
          {...(newTab && {
            target: '_blank',
            rel: 'noopener noreferrer'
          })}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
