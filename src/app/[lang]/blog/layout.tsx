import type { Metadata } from 'next'
import config from '#assets/config.json'
import { Title } from '#components/title'
import { useI18nElement } from '#lib/i18n'
import type { LayoutProps } from '#types/props'
import type { Props } from './page'

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  return {
    title: `${config.name} | Blog`,
    description: useI18nElement(config.blog.description, lang),
  } satisfies Metadata
}

export default function Layout({ children }: LayoutProps & Props) {
  return (
    <section>
      <Title>Blog.</Title>
      {children}
    </section>
  )
}
