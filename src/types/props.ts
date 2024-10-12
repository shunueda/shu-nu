import type { ReactNode } from 'react'

export interface LayoutProps {
  children: ReactNode
}

export type StaticParams<
  Props extends {
    params: unknown
  }
> = Promise<Partial<Awaited<Props['params']>>[]>
