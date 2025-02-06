import type { ReactElement } from 'react'
import resume from '~/assets/resume.json' with { type: 'json' }

export async function Footer(): Promise<ReactElement> {
  return (
    <footer className='my-12 text-xs text-gray-400'>
      © {new Date().getUTCFullYear()} {resume.name}.
    </footer>
  )
}
