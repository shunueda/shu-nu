import Link from 'next/link'
import classes from './nav.module.scss'

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
    label: 'about',
    href: '/about',
  },
]

export function Nav() {
  return (
    <nav className={classes.nav}>
      {items.map(({ href, label }) => {
        return (
          <Link className={classes.item} href={href} key={href}>
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
