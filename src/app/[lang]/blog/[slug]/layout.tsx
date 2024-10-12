import type { Metadata } from 'next'
import { getBlogPostOrNotFound, slugs } from '#lib/blogs'
import type { Lang } from '#lib/i18n'
import type { LayoutProps } from '#types/props'

export interface Props {
  params: Promise<{
    lang: Lang
    slug: string
  }>
}

export async function generateStaticParams() {
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug, lang } = await params
  const blog = getBlogPostOrNotFound(slug, lang)
  return {
    title: blog?.frontmatter?.title,
    description: blog?.content
  } satisfies Metadata
}

export default function Layout({ children }: LayoutProps & Props) {
  return <>{children}</>
}
