import { profile } from '@/utils/profile'
import { Route } from 'next'
import Link from 'next/link'

export const navItems: Record<string, string> = {
  home: '/',
  linkedin: profile.linkedin,
  github: profile.github
}

export default async function Navbar() {
  return (
    <aside className='-ml-[8px] mb-16 tracking-tight'>
      <div className='lg:sticky lg:top-20'>
        <nav
          className='flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative'
          id='nav'
        >
          <div className='flex flex-row space-x-0 pr-10'>
            {[
              ...Object.entries(navItems).map(([name, path]) => {
                return (
                  <Link
                    key={name}
                    href={path as Route}
                    rel='noopener noreferrer'
                    target={path.startsWith('http') ? '_blank' : '_self'}
                    className='transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1'
                  >
                    {name}
                  </Link>
                )
              })
            ]}
          </div>
        </nav>
      </div>
    </aside>
  )
}
