import type { ReactElement } from 'react'
import pkg from '~/package.json' with { type: 'json' }

export async function Footer(): Promise<ReactElement> {
  return (
    <footer className='my-12 text-xs text-gray-400'>
      © {new Date().getUTCFullYear()} {pkg.author.name}.
    </footer>
  )
}
