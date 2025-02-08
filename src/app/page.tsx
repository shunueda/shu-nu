import type { ReactElement } from 'react'
import { user } from '#lib/user'

export default async function Page(): Promise<ReactElement> {
  return (
    <section>
      <h1 className='text-2xl font-medium tracking-tighter'>{user.name}.</h1>
      <div className='mt-4'>{user.bio}</div>
    </section>
  )
}
