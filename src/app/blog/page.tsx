import info from '#assets/blog/info.json'
import { Title } from '#components/title'
import { useI18n } from '#lib/i18n'
import classes from './page.module.scss'

export default async function Page() {
  return (
    <section className={classes.content}>
      <Title>Blog.</Title>
      <Title level={2}>{await useI18n(info.verse.content)}</Title>
      <h3>— {await useI18n(info.verse.reference)}</h3>
    </section>
  )
}
