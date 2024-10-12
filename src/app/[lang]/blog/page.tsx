import Link from 'next/link'
import { Separator } from '#components/ui/separator'
import { i18n } from '#i18n'
import { blogs } from '#lib/blogs'
import { useI18n } from '#lib/i18n'
import { formatDate, notEmpty } from '#lib/utils'
import type { Props } from './layout'

export default async function Page({ params }: Props) {
  const { lang } = await params
  return (
    <>
      <p>{useI18n(i18n.blog.description, lang)}</p>
      <Separator className='my-4' />
      <div className='flex flex-col gap-4'>
        {blogs
          .values()
          .map(it => it[lang])
          .filter(notEmpty)
          .filter(it => !it.frontmatter.draft)
          .toArray()
          .sort((a, b) => +b.frontmatter.date - +a.frontmatter.date)
          .map(({ slug, frontmatter }) => (
            <Link key={slug} href={`/${lang}/blog/${slug}`} className=''>
              <p className='text-gray-500 text-xs font-semibold tracking-tight'>
                {formatDate(frontmatter.date)}
              </p>
              <p className='font-semibold text-sm text-gray-800'>
                ・{frontmatter.title}
              </p>
            </Link>
          ))}
      </div>
    </>
  )
}
