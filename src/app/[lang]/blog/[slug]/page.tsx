import { redirect } from 'next/navigation'
import { Mdx } from '#components/mdx'
import { getBlogFromSlug } from '#lib/blogs'
import { useI18n } from '#lib/i18n'
import { cn, formatDate } from '#lib/utils'
import type { Props } from './layout'

export default async function Page({ params }: Props) {
  const { slug, lang } = await params
  const { frontMatter, source } =
    getBlogFromSlug(slug, lang) || redirect(`/${lang}/blog`)
  return (
    <>
      <p className='pb-4 text-sm font-semibold'>
        <a href={`/${lang}/blog`} className='text-blue-600'>
          ←{' '}
          {useI18n(
            {
              en: 'Back to blog',
              ja: '記事一覧に戻る'
            },
            lang
          )}
        </a>
      </p>
      <h2>{frontMatter.title}</h2>
      <p className='text-xs font-semibold text-gray-500 tracking-tighter'>
        — {formatDate(frontMatter.date)}
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
          <Mdx source={source} lang={lang} />
        </article>
      </section>
    </>
  )
}
