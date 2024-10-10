import { Mdx } from '#components/mdx'
import { Title } from '#components/title'
import { i18nBlogs, notAvailableBlogs } from '#lib/blogs'
import { useI18n } from '#lib/i18n'
import { cn, formatDate } from '#lib/utils'
import type { Props } from './layout'
import classes from './page.module.scss'

export default async function Page({ params }: Props) {
  const { slug, lang } = await params
  const { frontmatter, content } =
    useI18n(i18nBlogs, lang).get(slug) || useI18n(notAvailableBlogs, lang)
  return (
    <>
      <Title level={2}>{frontmatter.title}</Title>
      <Title level={3}>— {formatDate(frontmatter.date)}</Title>
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
          <Mdx source={content} lang={lang} />
        </article>
      </section>
    </>
  )
}
