import { Title } from '#components/title'
import { config } from '#config'
import { i18nConfig } from '#config/i18n'
import { useI18nElement } from '#lib/i18n'
import { randomKey } from '#lib/utils'
import type { Props } from './layout'
import classes from './page.module.scss'

export default async function Page({ params }: Props) {
  const { lang } = await params
  return (
    <section className={classes.content}>
      <Title>{config.name}.</Title>
      <div className={classes.info}>
        {useI18nElement(i18nConfig.introduction, lang).map(it => (
          <p key={randomKey()}>{it}</p>
        ))}
      </div>
    </section>
  )
}
