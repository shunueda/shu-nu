import type { Metadata } from 'next'
import pkg from '~/package.json'
import { NotificationRequester } from '#components/notification-requester'
import { Title } from '#components/title'
import { i18nConfig } from '#config/i18n'
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
    title: `${pkg.name} | Blog`,
    description: useI18nElement(i18nConfig.blog.description, lang)
  } satisfies Metadata
}

export default async function Layout({
  children,
  params
}: LayoutProps & Props) {
  const { lang } = await params
  return (
    <section>
      <NotificationRequester lang={lang} />
      <div className="my-4" />
      <Title>Blog.</Title>
      {children}
    </section>
  )
}
