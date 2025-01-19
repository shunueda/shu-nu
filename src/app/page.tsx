import type { ReactElement } from 'react'
import pkg from '~/package.json' with { type: 'json' }

export default async function Page(): Promise<ReactElement> {
  return (
    <section>
      <h1 className='text-2xl font-medium tracking-tighter'>
        {pkg.author.name}.
      </h1>
      <div className='mt-4 flex flex-col gap-2'>
        Software engineer. Passionate about using technology to solve real-world
        problems.
      </div>
    </section>
  )
}
