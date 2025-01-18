import type { MetadataRoute } from 'next'
import pkg from '~/package.json' with { type: 'json' }

interface Entry {
  href: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}

const entries: Entry[] = [
  {
    href: '',
    priority: 1,
    changeFrequency: 'monthly'
  }
]

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map(({ href, ...it }) => ({
    ...it,
    url: new URL(href, pkg.homepage).href,
    lastModified: new Date()
  }))
}
