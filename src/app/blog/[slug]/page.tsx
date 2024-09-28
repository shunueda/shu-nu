import { Title } from '#components/title'
import { getBlog } from '#lib/blogs'
import { getLang } from '#lib/i18n'
import { formatDate } from '#lib/utils'
import classes from './page.module.scss'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: Props) {
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
}
