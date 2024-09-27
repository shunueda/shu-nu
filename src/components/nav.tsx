import { cookies } from 'next/headers'
import Link from 'next/link'
import { Cookie } from '../lib/Cookie'
import { Lang, isJapanese } from '../lib/Lang'
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
    href: '/',
  },
  {
    label: 'blog',
    href: '/blog',
  },
]

export async function Nav() {
  async function handleSwitch(checked: boolean) {
    'use server'
    const cookie = await cookies()
    cookie.set(Cookie.LANG, checked ? Lang.JA : Lang.EN)
  }
  return (
    <nav className={classes.nav}>
      {items.map(({ href, label }) => (
        <Link className={classes.item} href={href} key={href}>
          {label}
        </Link>
      ))}
      <div className={classes.lang}>
        <Label>{Lang.EN}</Label>
        <Switch checked={await isJapanese()} onCheckedChange={handleSwitch} />
        <Label>{Lang.JA}</Label>
      </div>
    </nav>
  )
}
