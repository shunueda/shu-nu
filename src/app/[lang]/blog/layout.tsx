import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import config from '#assets/config.json'
import { Title } from '#components/title'
import { type Lang, useI18nElement } from '#lib/i18n'

interface Props {
  children: ReactNode
  params: Promise<{
    lang: Lang
    slug: string
  }>
}

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  return {
    title: `${config.name} | Blog`,
    description: useI18nElement(config.blog.description, lang),
  } satisfies Metadata
}

export default function Layout({ children }: Props) {
  return (
    <section>
      <Title>Blog.</Title>
      {children}
    </section>
  )
}
