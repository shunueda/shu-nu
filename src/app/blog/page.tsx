import Link from 'next/link'
import info from '#assets/blog/info.json'
import { Title } from '#components/title'
import { allBlogs } from '#lib/blogs'
import { getLang, useI18n } from '#lib/i18n'
import { formatDate } from '#lib/utils'
import classes from './page.module.scss'

export default async function Page() {
  const lang = await getLang()
  return (
    <>
      <Title level={2}>{await useI18n(info.verse.content)}</Title>
      <Title level={3}>{`— ${await useI18n(info.verse.reference)}`}</Title>
      <section className={classes.list}>
        {allBlogs
          .map(it => it[lang])
          .sort(
            (a, b) =>
              b.frontMatter.date.getTime() - a.frontMatter.date.getTime(),
          )
          .map(({ slug, frontMatter }) => (
            <Link key={slug} href={`/blog/${slug}`} className={classes.entry}>
              <p className={classes.date}>{formatDate(frontMatter.date)}</p>
              <p className={classes.title}>{frontMatter.title}</p>
            </Link>
          ))}
      </section>
    </>
  )
}
