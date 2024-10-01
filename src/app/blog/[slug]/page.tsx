import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Title } from '#components/title'
import { getBlogFromSlug, getRenderedBlogFromSlug, slugs } from '#lib/blogs'
import { getLang } from '#lib/i18n'
import { cn, formatDate } from '#lib/utils'
import classes from './page.module.scss'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const lang = await getLang()
  const { slug } = await params
  const blog = getBlogFromSlug(lang, slug)
  if (!blog) {
    return {
      title: 'Not Found',
    }
  }
  return {
    title: blog.frontMatter.title,
    description: blog.source,
  } satisfies Metadata
}

export default async function Page({ params }: Props) {
  const lang = await getLang()
  const { slug } = await params
  const { frontMatter, rendered } =
    getRenderedBlogFromSlug(lang, slug) || redirect('/blog')
  return (
    <>
      <Title level={2}>{frontMatter.title}</Title>
      <Title level={3}>{`— ${formatDate(frontMatter.date)}`}</Title>
      <section className={classes.content}>
        <article
          className={cn(
            'prose',
            'prose-blockquote:not-italic',
            'prose-blockquote:text-sm',
            'before:prose-p:content-none',
            'after:prose-p:content-none',
          )}
        >
          {rendered}
        </article>
      </section>
    </>
  )
}
