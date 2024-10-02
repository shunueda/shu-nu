import profile from '../assets/config.json'
import styles from './footer.module.scss'

export async function Footer() {
  return (
    <footer className={styles.footer}>
      © {new Date().getUTCFullYear()} {profile.name}.
    </footer>
  )
}
