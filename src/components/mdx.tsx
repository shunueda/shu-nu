import { join } from 'node:path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import type { Lang } from '#lib/i18n'

interface Props {
  content: string
  lang: Lang
  slug: string
}

const url =
  'https://raw.githubusercontent.com/shunueda/shu-nu/refs/heads/main/src/blog/'

export async function Mdx({ content, lang, slug }: Props) {
  return (
    <MDXRemote
      source={content.replaceAll('「', ' 「').replaceAll('」', '」 ')}
      components={{
        img: props => {
          const { src, alt, title } = props
          return (
            <>
              <Image
                src={join(url, slug, src || '')}
                alt={alt || ''}
                className='md:w-3/4 h-auto mx-auto'
                width={500}
                height={500}
              />
              {title && (
                <span className='block text-center text-sm -mt-6'>{title}</span>
              )}
            </>
          )
        },
        a: ({ href, children }) => (
          <Link href={`/${lang}${href}` || ''}>{children}</Link>
        )
      }}
    />
  )
}
