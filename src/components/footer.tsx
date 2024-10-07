import { config } from '#config'
import styles from './footer.module.scss'

export async function Footer() {
  return (
    <footer className={styles.footer}>
      © {new Date().getUTCFullYear()} {config.name}.
    </footer>
  )
}
