import profile from '#assets/profile.json'
import { Title } from '#components/title'
import { useI18n } from '#lib/i18n'
import { key } from '#lib/utils'
import classes from './page.module.scss'

export default async function Page() {
  return (
    <section className={classes.content}>
      <Title>{`${await useI18n(profile.name)}.`}</Title>
      <div className={classes.info}>
        {(await useI18n(profile.introduction)).map(paragraph => (
          <p key={key()}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}
