import Link from 'next/link'
import config from '#assets/config.json'
import { Separator } from '#components/ui/separator'
import { allBlogs } from '#lib/blogs'
import { getLang, useI18n } from '#lib/i18n'
import { formatDate } from '#lib/utils'
import classes from './page.module.scss'

export default async function Page() {
  const lang = await getLang()
  return (
    <>
      <p className={classes.description}>
        {await useI18n(config.blog.description)}
      </p>
      <Separator className="my-4" />
      <div className={classes.list}>
        {allBlogs
          .map(it => it[lang])
          .sort(
            (a, b) =>
              b.frontMatter.date.getTime() - a.frontMatter.date.getTime(),
          )
          .map(({ slug, frontMatter }) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className={classes.entry}
              prefetch
            >
              <p className={classes.date}>{formatDate(frontMatter.date)}</p>
              <p className={classes.title}>・{frontMatter.title}</p>
            </Link>
          ))}
      </div>
    </>
  )
}
