import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import config from '#assets/config.json'
import { Title } from '#components/title'
import { useI18n } from '#lib/i18n'

interface Props {
  children: ReactNode
}

export async function generateMetadata() {
  return {
    title: `${await useI18n(config.name)} | Blog`,
    description: await useI18n(config.blog.description),
  } satisfies Metadata
}

export default function Layout({ children }: Props) {
  return (
    <section>
      <Title>Blog.</Title>
      {children}
    </section>
  )
}
