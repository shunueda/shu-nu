import type { ReactElement } from 'react'
import resume from '~/assets/resume.json' with { type: 'json' }

export async function Footer(): Promise<ReactElement> {
  return (
    <footer className='my-10 text-gray-400 text-xs'>
      © {new Date().getUTCFullYear()} {resume.name}.
    </footer>
  )
}
