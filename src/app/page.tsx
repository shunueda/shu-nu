import config from '#assets/config.json'
import { Title } from '#components/title'
import { useI18n } from '#lib/i18n'
import { randomKey } from '#lib/utils'
import classes from './page.module.scss'

export default async function Page() {
  return (
    <section className={classes.content}>
      <Title>{`${await useI18n(config.name)}.`}</Title>
      <div className={classes.info}>
        {(await useI18n(config.introduction)).map(it => (
          <p key={randomKey()}>{it}</p>
        ))}
      </div>
    </section>
  )
}
