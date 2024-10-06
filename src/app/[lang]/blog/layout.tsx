import type { Metadata } from 'next'
import config from '~/config.json'
import { Title } from '#components/title'
import { type Lang, useI18nElement } from '#lib/i18n'
import type { LayoutProps } from '#types/props'

export interface Props {
  params: Promise<{
    lang: Lang
  }>
}

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  return {
    title: `${config.name} | Blog`,
    description: useI18nElement(config.blog.description, lang)
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
