import { config } from '#config'
import { i18n } from '#i18n'
import { useI18n } from '#lib/i18n'
import { randomKey } from '#lib/utils'
import type { Props } from './layout'

export default async function Page({ params }: Props) {
  const { lang } = await params
  return (
    <section>
      <h1>{config.name}.</h1>
      <div className='mt-4 flex flex-col gap-2'>
        {useI18n(i18n.introduction, lang).map(it => (
          <p key={randomKey()}>{it}</p>
        ))}
      </div>
    </section>
  )
}
