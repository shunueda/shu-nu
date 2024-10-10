import type { ReactNode } from 'react'
import {
  type Infer,
  boolean,
  coerce,
  date,
  defaulted,
  object,
  string
} from 'superstruct'

export interface BlogPost {
  slug: string
  frontMatter: Infer<typeof frontMatter>
  source: string
}

export interface RenderedBlogPost {
  slug: string
  frontMatter: Infer<typeof frontMatter>
  rendered: ReactNode
}

export const frontMatter = object({
  title: string(),
  date: coerce(date(), string(), it => new Date(it)),
  draft: defaulted(boolean(), false)
})
