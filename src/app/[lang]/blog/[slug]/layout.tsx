import type { Metadata } from 'next'
import Link from 'next/link'
import { i18n } from '#i18n'
import { getBlogPostOrNotFound, slugs } from '#lib/blog'
import { type Lang, useI18n } from '#lib/i18n'
import type { LayoutProps, StaticParams } from '#types/props'

export interface Props {
  params: Promise<{
    lang: Lang
    slug: string
  }>
}

export async function generateStaticParams(): StaticParams<Props> {
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params
  const blog = getBlogPostOrNotFound(slug, lang)
  return {
    title: blog?.frontmatter?.title,
    description: blog?.content
  }
}

export default async function Layout({
  children,
  params
}: LayoutProps & Props) {
  const { lang } = await params
  return (
    <>
      <p className='pb-4 text-sm font-semibold'>
        <Link href={`/${lang}/blog`} className='text-blue-600'>
          ← {useI18n(i18n.blog.back, lang)}
        </Link>
      </p>
      {children}
    </>
  )
}
