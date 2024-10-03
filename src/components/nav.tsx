'use client'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Lang } from '../lib/i18n'
import classes from './nav.module.scss'
import { Label } from './ui/label'
import { Switch } from './ui/switch'

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
        <Link
          prefetch
          className={classes.item}
          href={`/${lang}${href}`}
          key={href}
        >
          {label}
        </Link>
      ))}
      <div className={classes.lang}>
        <Label>{Lang.EN}</Label>
        <Switch
          checked={lang === Lang.JA}
          onCheckedChange={async checked => {
            redirect(
              `/${checked ? Lang.JA : Lang.EN}/${location.pathname.substring(
                `/${Lang.EN}/`.length
              )}`
            )
          }}
        />
        <Label>{Lang.JA}</Label>
      </div>
    </nav>
  )
}
