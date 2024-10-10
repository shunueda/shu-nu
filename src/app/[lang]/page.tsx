import { Title } from '#components/title'
import { config } from '#config'
import { i18n } from '#i18n'
import { useI18n } from '#lib/i18n'
import { randomKey } from '#lib/utils'
import type { Props } from './layout'
import classes from './page.module.scss'

export default async function Page({ params }: Props) {
  const { lang } = await params
  return (
    <section className={classes.content}>
      <Title>{config.name}.</Title>
      <div className={classes.info}>
        {useI18n(i18n.introduction, lang).map(it => (
          <p key={randomKey()}>{it}</p>
        ))}
      </div>
    </section>
  )
}
