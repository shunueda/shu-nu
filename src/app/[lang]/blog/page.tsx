import Link from 'next/link'
import type { ReactNode } from 'react'
import config from '#assets/config.json'
import { Separator } from '#components/ui/separator'
import { allBlogs } from '#lib/blogs'
import { type Lang, useI18nElement } from '#lib/i18n'
import { formatDate } from '#lib/utils'
import classes from './page.module.scss'

interface Props {
  children: ReactNode
  params: Promise<{
    lang: Lang
  }>
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  return (
    <>
      <p className={classes.description}>
        {useI18nElement(config.blog.description, lang)}
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
              prefetch
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
