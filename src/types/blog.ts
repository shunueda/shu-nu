import {
  type Infer,
  boolean,
  coerce,
  date,
  defaulted,
  object,
  string
} from 'superstruct'

export interface Blog {
  frontmatter: Infer<typeof frontmatterStruct>
  content: string
}

export const frontmatterStruct = object({
  title: string(),
  date: defaulted(
    coerce(date(), string(), it => new Date(it)),
    new Date()
  ),
  draft: defaulted(boolean(), false)
})
