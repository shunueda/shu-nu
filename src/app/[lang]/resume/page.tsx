import { capitalCase } from 'change-case'
import { FileTextIcon } from 'lucide-react'
import Link from 'next/link'
import resume from '#assets/resume.json'
import { Button } from '../../../components/ui/button'

export default function Page() {
  return (
    <section>
      <h1>Resume</h1>
      <Link href={'/Shun_Ueda_Resume.pdf'} target='_blank'>
        <Button className='mt-4'>
          <FileTextIcon />
          View in PDF
        </Button>
      </Link>
      <div className='text-center mt-2'>
        <h1>{resume.name}</h1>
        {[resume.email, resume.linkedin, resume.github].map((it, i) => (
          <>
            {i > 0 && (
              <span key={Math.random()} className='mx-2'>
                |
              </span>
            )}
            <a
              key={it}
              href={it.includes('@') ? `mailto:${it}` : it}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 text-sm'
            >
              {it.replace('https://', '')}
            </a>
          </>
        ))}
      </div>
      <div className='mt-4'>
        <h2>Education</h2>
        {resume.education.map(it => (
          <section key={it.duration} className='mt-2 text-sm'>
            <div className='flex justify-between'>
              <div className='font-bold'>{it.institution}</div>
              <div>{it.duration}</div>
            </div>
            <div className='flex justify-between'>
              <div>{it.degree}</div>
              <div className='italic'>{it.location}</div>
            </div>
          </section>
        ))}
      </div>
      <div className='mt-4'>
        <h2>Experience</h2>
        {resume.experience.map(it => (
          <section key={it.duration} className='mt-2 text-sm'>
            <div className='flex justify-between'>
              <div className='font-bold'>{it.company}</div>
              <div>{it.duration}</div>
            </div>
            <div className='flex justify-between'>
              <div>{it.role}</div>
              <div className='italic'>{it.location}</div>
            </div>
            <ul className='mt-2 list-disc ml-8'>
              {it.descriptions.map(it => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className='mt-4'>
        <h2>Skills</h2>
        {Object.entries(resume.skills).map(([category, skills]) => (
          <section key={category} className='mt-2 text-sm'>
            <span className='font-bold'>{capitalCase(category)}: </span>
            {skills.join(', ')}
          </section>
        ))}
      </div>
    </section>
  )
}
