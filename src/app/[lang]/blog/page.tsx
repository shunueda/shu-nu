import Link from 'next/link'
import { Separator } from '#components/ui/separator'
import { i18n } from '#i18n'
import { i18nBlogs } from '#lib/blogs'
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
        {useI18n(i18nBlogs, lang)
          .entries()
          .filter(([_, { frontmatter }]) => !frontmatter.draft)
          .toArray()
          .sort(
            ([, { frontmatter: a }], [, { frontmatter: b }]) =>
              b.date.getTime() - a.date.getTime()
          )
          .map(([slug, { frontmatter }]) => (
            <Link
              key={slug}
              href={`/${lang}/blog/${slug}`}
              className={classes.entry}
            >
              <p className={classes.date}>{formatDate(frontmatter.date)}</p>
              <p className={classes.title}>・{frontmatter.title}</p>
            </Link>
          ))}
      </div>
    </>
  )
}

// .sort(
//   (a, b) =>
//     b.frontMatter.date.getTime() - a.frontMatter.date.getTime()
// )
