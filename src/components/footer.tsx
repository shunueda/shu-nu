import type { ReactElement } from 'react'
import { user } from '#lib/user'

export async function Footer(): Promise<ReactElement> {
  return (
    <footer className='my-10 text-xs text-gray-400'>
      © {new Date().getUTCFullYear()} {user.name}.
    </footer>
  )
}
