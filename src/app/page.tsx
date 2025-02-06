import type { ReactElement } from 'react'
import { bio, name } from '#lib/user'

export default async function Page(): Promise<ReactElement> {
  return (
    <section>
      <h1 className='text-2xl font-medium tracking-tighter'>{name}.</h1>
      <div className='mt-4 flex flex-col gap-2'>{bio}</div>
    </section>
  )
}
