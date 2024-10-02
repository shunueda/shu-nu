import config from '#assets/config.json'
import { Title } from '#components/title'
import { type Lang, useI18nElement } from '#lib/i18n'
import { randomKey } from '#lib/utils'
import classes from './page.module.scss'

export interface Props {
  params: Promise<{
    lang: Lang
  }>
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  return (
    <section className={classes.content}>
      <Title>{config.name}.</Title>
      <div className={classes.info}>
        {useI18nElement(config.introduction, lang).map(it => (
          <p key={randomKey()}>{it}</p>
        ))}
      </div>
    </section>
  )
}
