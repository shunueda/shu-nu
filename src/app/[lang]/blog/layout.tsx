import type { Metadata } from 'next'
import pkg from '~package.json'
import { i18n } from '#i18n'
import { type Lang, useI18n } from '#lib/i18n'
import type { LayoutProps } from '#types/props'

export interface Props {
  params: Promise<{
    lang: Lang
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: {
      template: `${pkg.author.name} - %s`,
      default: 'Blog'
    },
    description: useI18n(i18n.blog.description, lang)
  }
}

export default async function Layout({
  children,
  params
}: LayoutProps & Props) {
  return (
    <section>
      <h1>Blog.</h1>
      <div className='mt-4'>{children}</div>
    </section>
  )
}
