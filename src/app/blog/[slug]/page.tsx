import { notFound } from 'next/navigation'
import { Title } from '#components/title'
import { getAllBlogs, getBlog } from '#lib/blogs'
import { Lang, getLang } from '#lib/i18n'
import { formatDate } from '#lib/utils'
import classes from './page.module.scss'

export async function generateStaticParams() {
  return await Promise.all(
    Object.values(Lang).flatMap(async lang =>
      (await getAllBlogs(lang)).map(({ slug }) => ({ slug })),
    ),
  )
}

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: Props) {
  try {
    const { slug } = await params
    const lang = await getLang()
    const { frontMatter, content } = await getBlog(slug, lang)
    return (
      <>
        <Title level={2}>{frontMatter.title}</Title>
        <Title level={3}>{`— ${formatDate(frontMatter.date)}`}</Title>
        <section className={classes.content}>{content}</section>
      </>
    )
  } catch (e) {
    notFound()
  }
}
