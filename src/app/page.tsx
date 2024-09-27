import profile from '#assets/profile.json'
import { i18n } from '#lib/Lang'
import { key } from '#lib/utils'
import classes from './page.module.scss'

export default async function Page() {
  return (
    <section className={classes.content}>
      <h1>{await i18n(profile.name)}</h1>
      <div className={classes.info}>
        {(await i18n(profile.introduction)).map(paragraph => (
          <p key={key()}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}
