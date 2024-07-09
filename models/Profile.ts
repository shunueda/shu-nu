export interface Profile {
  name: string
  email: string
  linkedin: string
  github: string
  experiences: Experience[]
}

interface Experience {
  company: string
  title: string
  start: string
  end: string
}
