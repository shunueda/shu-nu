import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import type { Lang } from '#lib/i18n'

interface Props {
  source: string
  lang: Lang
}

function clean(source: string) {
  return source.replaceAll('「', ' 「').replaceAll('」', '」 ')
}

export async function Mdx({ source, lang }: Props) {
  return (
    <MDXRemote
      source={clean(source)}
      components={{
        a: ({ href, children }) => (
          <Link href={`/${lang}${href}` || ''}>{children}</Link>
        )
      }}
    />
  )
}
