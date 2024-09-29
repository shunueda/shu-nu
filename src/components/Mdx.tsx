import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

interface Props {
  source: string
}

export async function Mdx({ source }: Props) {
  return (
    <MDXRemote
      source={source}
      components={{
        a: ({ href, children }) => (
          <Link prefetch href={href || ''}>
            {children}
          </Link>
        ),
      }}
    />
  )
}
