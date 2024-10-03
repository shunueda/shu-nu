import type { Metadata } from 'next'
import { getBlogFromSlug, slugs } from '#lib/blogs'
import type { LayoutProps } from '#types/props'
import type { Props } from './page'

export async function generateStaticParams() {
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug, lang } = await params
  const blog = getBlogFromSlug(slug, lang)
  return {
    title: blog?.frontMatter?.title,
    description: blog?.source
  } satisfies Metadata
}

export default function Layout({ children }: LayoutProps & Props) {
  return <>{children}</>
}
