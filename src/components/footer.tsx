import classes from './footer.module.scss'

export function Footer() {
  return (
    <footer className={classes.footer}>
      © {new Date().getUTCFullYear()} Shun Ueda
    </footer>
  )
}
