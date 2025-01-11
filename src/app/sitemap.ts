import type { MetadataRoute } from 'next'
import pkg from '~/package.json' with { type: 'json' }
import { Lang } from '#lib/i18n'

interface Entry {
  href: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}

const entries: Entry[] = [
  {
    href: '',
    priority: 0.8,
    changeFrequency: 'monthly'
  },
  {
    href: '/resume',
    priority: 1,
    changeFrequency: 'monthly'
  }
]

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map(({ href, priority, changeFrequency }) => ({
    url: new URL(href, pkg.homepage).href,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        Object.values(Lang).map(lang => [
          lang,
          new URL(`${lang}${href}`, pkg.homepage).href
        ])
      )
    },
    priority,
    changeFrequency
  }))
}
