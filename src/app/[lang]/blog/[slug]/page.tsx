import { Mdx } from '#components/mdx'
import { getBlogPostOrNotFound } from '#lib/blog'
import { cn, formatDate } from '#lib/utils'
import type { Props } from './layout'

export default async function Page({ params }: Props) {
  const { slug, lang } = await params
  const { frontmatter, content, path } = getBlogPostOrNotFound(slug, lang)
  return (
    <>
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
              lang,
              path
            }}
          />
        </article>
      </section>
    </>
  )
}
