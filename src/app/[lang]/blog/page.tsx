import Link from 'next/link'
import { Separator } from '#components/ui/separator'
import { i18n } from '#i18n'
import { allBlogs } from '#lib/blogs'
import { useI18n } from '#lib/i18n'
import { formatDate } from '#lib/utils'
import type { Props } from './layout'

export default async function Page({ params }: Props) {
  const { lang } = await params
  return (
    <>
      <p>{useI18n(i18n.blog.description, lang)}</p>
      <Separator className='my-4' />
      <div className='flex flex-col gap-4'>
        {allBlogs
          .map(it => it[lang])
          .sort(
            (a, b) =>
              b.frontMatter.date.getTime() - a.frontMatter.date.getTime()
          )
          .filter(({ frontMatter }) => !frontMatter.draft)
          .map(({ slug, frontMatter }) => (
            <Link key={slug} href={`/${lang}/blog/${slug}`} className=''>
              <p className='text-gray-500 text-xs font-semibold tracking-tight'>
                {formatDate(frontMatter.date)}
              </p>
              <p className='font-semibold text-sm text-gray-800'>
                ・{frontMatter.title}
              </p>
            </Link>
          ))}
      </div>
    </>
  )
}
