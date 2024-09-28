import { MDXRemote } from 'next-mdx-remote/rsc'
import { Title } from '#components/title'
import { getLang } from '#lib/i18n'
import { cn, formatDate } from '#lib/utils'
import { getBlogFromSlug, slugs } from '../../../lib/blogs'
import classes from './page.module.scss'

export async function generateStaticParams() {
  return slugs.map(slug => ({ slug }))
}

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const lang = await getLang()
  const { frontMatter, content } = getBlogFromSlug(lang, slug)
  return (
    <>
      <Title level={2}>{frontMatter.title}</Title>
      <Title level={3}>{`— ${formatDate(frontMatter.date)}`}</Title>
      <section className={classes.content}>
        <article
          className={cn(
            'prose',
            'prose-blockquote:not-italic',
            'prose-blockquote:text-sm',
            'before:prose-p:content-none',
            'after:prose-p:content-none',
          )}
        >
          <MDXRemote source={content} />
        </article>
      </section>
    </>
  )
}
