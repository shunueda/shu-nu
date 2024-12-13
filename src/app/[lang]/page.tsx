import pkg from '~/package.json'
import { i18n } from '#i18n'
import { useI18n } from '#lib/i18n'
import type { Props } from './layout'

export default async function Page({ params }: Props) {
  const { lang } = await params
  return (
    <section>
      <h1>{pkg.author.name}.</h1>
      <div className='mt-4 flex flex-col gap-2'>
        {useI18n(i18n.introduction, lang).map(it => (
          <p key={it.substring(0, 5)}>{it}</p>
        ))}
      </div>
    </section>
  )
}
