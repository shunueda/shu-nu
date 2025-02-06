import type { ReactElement } from 'react'
import { Endpoint } from '#lib/endpoint'

export default async function Page(): Promise<ReactElement> {
  const response = await fetch(Endpoint.GITHUB_USER)
  const { name, bio } = await response.json()
  return (
    <section>
      <h1 className='text-2xl font-medium tracking-tighter'>{name}.</h1>
      <div className='mt-4 flex flex-col gap-2'>{bio}</div>
    </section>
  )
}
