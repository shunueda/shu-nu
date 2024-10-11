import Link from 'next/link'
import type { Lang } from '#lib/i18n'
import { LanguageSwitch } from './language-switch'

interface NavItem {
  label: string
  href: string
}

const items: NavItem[] = [
  {
    label: 'home',
    href: '/'
  },
  {
    label: 'blog',
    href: '/blog'
  }
]

interface Props {
  lang: Lang
}

export function Nav({ lang }: Props) {
  return (
    <nav className='pt-12 pb-12 flex gap-8'>
      {items.map(({ href, label }) => (
        <Link
          className='hover:text-gray-500'
          href={`/${lang}${href}`}
          key={href}
        >
          {label}
        </Link>
      ))}
      <div className='ml-auto flex gap-2 items-center'>
        <LanguageSwitch lang={lang} />
      </div>
    </nav>
  )
}
