import profile from '../assets/profile.json'
import { useI18n } from '../lib/i18n'
import classes from './footer.module.scss'

export async function Footer() {
  return (
    <footer className={classes.footer}>
      © {new Date().getUTCFullYear()} {await useI18n(profile.name)}.
    </footer>
  )
}
