import { profile } from '@/utils/profile'

export default async function Page() {
  return (
    <section>
      <h1 className='text-4xl font-semibold tracking-tighter'>
        {profile.name}
      </h1>
      <h2 className='font-semibold tracking-tighter text-sm mb-8'>
        {profile.email}
      </h2>
      <div className='mb-4'>
        Software engineer. Passionate about using technology to solve real-world
        problems.
      </div>
      {profile.experiences.map((experience, i) => (
        <div className='my-8' key={i}>
          <div className='w-full flex flex-col md:flex-row space-x-0 md:space-x-2'>
            <p className='text-neutral-600 dark:text-neutral-400 w-[200px] tabular-nums'>
              {experience.start} — {experience.end}
            </p>
            <div className='text-neutral-900 dark:text-neutral-100 tracking-tight'>
              <p className='font-bold'>{experience.company}</p>
              <p>{experience.title}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
