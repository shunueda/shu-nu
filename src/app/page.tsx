import type { ReactElement } from 'react'
import resume from '~/assets/resume.json' with { type: 'json' }

export default async function Page(): Promise<ReactElement> {
  return (
    <section>
      <h1 className='font-medium text-2xl tracking-tighter'>{resume.name}.</h1>
      <div className='mt-4'>
        Software engineer. Passionate about using technology to solve real-world
        problems.
      </div>
    </section>
  )
}
