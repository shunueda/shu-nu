import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import type { Lang } from '#lib/i18n'

interface Props {
  content: string
  lang: Lang
  slug: string
}

export async function Mdx({ content, lang, slug }: Props) {
  return (
    <MDXRemote
      source={content.replaceAll('「', ' 「').replaceAll('」', '」 ')}
      components={{
        img: ({ src, alt, title }) => {
          return (
            <span className='md:w-3/4 block mx-auto'>
              <Image
                className='my-4'
                src={`/${slug}/${src}`}
                alt={alt || ''}
                width={1000}
                height={1000}
              />
              <span className='w-10/12 block mx-auto'>
                {alt && (
                  <span className='block text-center text-sm'>{alt}</span>
                )}
                {title && (
                  <span className='block text-center text-xs mt-1 italic text-gray-400'>
                    {title}
                  </span>
                )}
              </span>
            </span>
          )
        },
        a: ({ href, children }) => (
          <Link href={`/${lang}${href}`}>{children}</Link>
        )
      }}
    />
  )
}
