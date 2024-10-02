import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import type { Lang } from '../lib/i18n'

interface Props {
  source: string
  lang: Lang
}

export async function Mdx({ source, lang }: Props) {
  return (
    <MDXRemote
      source={source}
      components={{
        a: ({ href, children }) => (
          <Link prefetch href={`/${lang}${href}` || ''}>
            {children}
          </Link>
        ),
      }}
    />
  )
}
