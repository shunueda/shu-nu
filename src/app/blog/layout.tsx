import type { ReactNode } from 'react'
import { Title } from '#components/title'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <section>
      <Title>Blog.</Title>
      {children}
    </section>
  )
}
