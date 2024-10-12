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
  frontmatter: Infer<typeof frontmatter>
  content: string
}

export interface RenderedBlogPost {
  slug: string
  frontMatter: Infer<typeof frontmatter>
  rendered: ReactNode
}

export const frontmatter = object({
  title: string(),
  date: coerce(date(), string(), it => new Date(it)),
  draft: defaulted(boolean(), false)
})
