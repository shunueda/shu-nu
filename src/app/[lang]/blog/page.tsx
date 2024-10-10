import Link from 'next/link'
import { Separator } from '#components/ui/separator'
import { i18n } from '#i18n'
import { allBlogs } from '#lib/blogs'
import { useI18n } from '#lib/i18n'
import { formatDate } from '#lib/utils'
import type { Props } from './layout'
import classes from './page.module.scss'

export default async function Page({ params }: Props) {
  const { lang } = await params
  return (
    <>
      <p className={classes.description}>
        {useI18n(i18n.blog.description, lang)}
      </p>
      <Separator className='my-4' />
      <div className={classes.list}>
        {allBlogs
          .map(it => it[lang])
          .sort(
            (a, b) =>
              b.frontMatter.date.getTime() - a.frontMatter.date.getTime()
          )
          .filter(({ frontMatter }) => !frontMatter.draft)
          .map(({ slug, frontMatter }) => (
            <Link
              key={slug}
              href={`/${lang}/blog/${slug}`}
              className={classes.entry}
            >
              <p className={classes.date}>{formatDate(frontMatter.date)}</p>
              <p className={classes.title}>・{frontMatter.title}</p>
            </Link>
          ))}
      </div>
    </>
  )
}
