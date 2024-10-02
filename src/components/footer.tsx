import profile from '../assets/config.json'
import { type Lang, useI18nElement } from '../lib/i18n'
import styles from './footer.module.scss'

export async function Footer() {
  return (
    <footer className={styles.footer}>
      © {new Date().getUTCFullYear()} {profile.name}.
    </footer>
  )
}
