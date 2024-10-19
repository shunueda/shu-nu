import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactPortal } from 'react'
import type { Lang } from '#lib/i18n'

interface Props {
  content: string
  lang: Lang
  slug: string
}

export async function Mdx({ content, lang, slug }: Props) {
  return (
    <MDXRemote
      source={content}
      components={{
        img: ({ src, alt, title }) => (
          <span className='md:w-3/4 block mx-auto'>
            <Image
              className='my-0 block mx-auto'
              src={`/${slug}/${src}`}
              alt={alt || ''}
              width={1000}
              height={1000}
            />
            <span className='block mx-auto mt-0.5'>
              <span className='block text-right text-xs italic text-gray-400'>
                {title}
              </span>
              <span className='w-10/12 block text-center text-sm mt-2 mx-auto'>
                {alt}
              </span>
            </span>
          </span>
        ),
        a: ({ href, children }) => (
          <Link href={`/${lang}${href}`}>{children as ReactPortal}</Link>
        )
      }}
    />
  )
}
