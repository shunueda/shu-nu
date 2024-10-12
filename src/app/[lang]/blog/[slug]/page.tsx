import { Mdx } from '#components/mdx'
import { i18n } from '#i18n'
import { getBlogPostOrNotFound } from '#lib/blog'
import { useI18n } from '#lib/i18n'
import { cn, formatDate } from '#lib/utils'
import type { Props } from './layout'

export default async function Page({ params }: Props) {
  const { slug, lang } = await params
  const { frontmatter, content } = getBlogPostOrNotFound(slug, lang)
  return (
    <>
      <p className='pb-4 text-sm font-semibold'>
        <a href={`/${lang}/blog`} className='text-blue-600'>
          ← {useI18n(i18n.blog.back, lang)}
        </a>
      </p>
      <h2>{frontmatter.title}</h2>
      <p className='text-xs font-semibold text-gray-500 tracking-tighter'>
        — {formatDate(frontmatter.date)}
      </p>
      <section className='mt-5'>
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
          <Mdx
            {...{
              content,
              lang
            }}
          />
        </article>
      </section>
    </>
  )
}
