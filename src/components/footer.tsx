import type { ReactElement } from 'react'
import { name } from '#lib/user'

export async function Footer(): Promise<ReactElement> {
  return (
    <footer className='my-12 text-xs text-gray-400'>
      © {new Date().getUTCFullYear()} {name}.
    </footer>
  )
}
