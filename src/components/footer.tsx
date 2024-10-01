import { useI18n } from '#lib/i18n'
import profile from '../assets/config.json'
import styles from './footer.module.scss'

export async function Footer() {
  return (
    <div className={styles.footer}>
      © {new Date().getUTCFullYear()} {await useI18n(profile.name)}.
    </div>
  )
}
