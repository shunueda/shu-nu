import { join, parse } from 'node:path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import type { Lang } from '#lib/i18n'

interface Props {
  content: string
  lang: Lang
  path: string
}

function clean(source: string) {
  return source.replaceAll('「', ' 「').replaceAll('」', '」 ')
}

export async function Mdx({ content, lang, path }: Props) {
  return (
    <MDXRemote
      source={clean(content)}
      components={{
        img: ({ src, alt }) => {
          const { dir } = parse(path)
          return (
            <img
              src={join(dir, src || '')}
              alt={alt}
              className='w-full h-auto'
            />
          )
        },
        a: ({ href, children }) => (
          <Link href={`/${lang}${href}` || ''}>{children}</Link>
        )
      }}
    />
  )
}
