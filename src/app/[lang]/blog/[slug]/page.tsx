import { redirect } from 'next/navigation'
import { Title } from '#components/title'
import { getRenderedBlogFromSlug } from '#lib/blogs'
import { cn, formatDate } from '#lib/utils'
import type { Props } from './layout'
import classes from './page.module.scss'

export default async function Page({ params }: Props) {
  const { slug, lang } = await params
  const { frontMatter, rendered } =
    getRenderedBlogFromSlug(slug, lang) || redirect(`/${lang}/blog`)
  return (
    <>
      <Title level={2}>{frontMatter.title}</Title>
      <Title level={3}>— {formatDate(frontMatter.date)}</Title>
      <section className={classes.content}>
        <article
          className={cn(
            'prose',
            'prose-blockquote:not-italic',
            'prose-blockquote:text-sm',
            'prose-blockquote:leading-6',
            'before:prose-p:content-none',
            'after:prose-p:content-none'
          )}
        >
          {rendered}
        </article>
      </section>
    </>
  )
}
