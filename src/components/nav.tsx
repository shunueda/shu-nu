import Link from 'next/link'
import type { Lang } from '#lib/i18n'
import { LanguageSwitch } from './language-switch'
import classes from './nav.module.scss'

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
    <nav className={classes.nav}>
      {items.map(({ href, label }) => (
        <Link className={classes.item} href={`/${lang}${href}`} key={href}>
          {label}
        </Link>
      ))}
      <div className={classes.lang}>
        <LanguageSwitch lang={lang} />
      </div>
    </nav>
  )
}
