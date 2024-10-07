import pkg from '~/package.json'
import { Title } from '#components/title'
import { i18nConfig } from '#i18n-config'
import { useI18nElement } from '#lib/i18n'
import { randomKey } from '#lib/utils'
import type { Props } from './layout'
import classes from './page.module.scss'

export default async function Page({ params }: Props) {
  const { lang } = await params
  return (
    <section className={classes.content}>
      <Title>{pkg.name}.</Title>
      <div className={classes.info}>
        {useI18nElement(i18nConfig.introduction, lang).map(it => (
          <p key={randomKey()}>{it}</p>
        ))}
      </div>
    </section>
  )
}
