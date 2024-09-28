import Link from 'next/link'
import { Lang, isJapanese, setLangCookie } from '#lib/i18n'
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
    await setLangCookie(checked ? Lang.JA : Lang.EN)
  }
  return (
    <nav className={classes.nav}>
      {items.map(({ href, label }) => (
        <Link className={classes.item} href={href} key={href} prefetch>
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
