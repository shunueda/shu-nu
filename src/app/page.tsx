import { Octokit } from '@octokit/rest'
import type { ReactElement } from 'react'
import resume from '~/assets/resume.json' with { type: 'json' }

export default async function Page(): Promise<ReactElement> {
  const { data } = await new Octokit().users.getByUsername({
    username: 'shunueda'
  })
  return (
    <section>
      <h1 className='text-2xl font-medium tracking-tighter'>{resume.name}.</h1>
      <div className='mt-4 flex flex-col gap-2'>{data.bio}</div>
    </section>
  )
}
