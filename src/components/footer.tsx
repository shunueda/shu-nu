import pkg from '~/package.json'
import styles from './footer.module.scss'

export async function Footer() {
  return (
    <footer className={styles.footer}>
      © {new Date().getUTCFullYear()} {pkg.author.name}.
    </footer>
  )
}
