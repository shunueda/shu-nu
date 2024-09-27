import info from '#assets/blog/info.json'
import { i18n } from '../../lib/Lang'
import classes from './page.module.scss'

export default function Page() {
  return (
    <section className={classes.content}>
      <h1>Blog.</h1>
      <h2>{i18n(info.verse.content)}</h2>
      <h3>— {i18n(info.verse.reference)}</h3>
    </section>
  )
}
