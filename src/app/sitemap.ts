import type { MetadataRoute } from 'next'
import { config } from '#config'
import { slugs } from '#lib/blogs'
import { Lang } from '#lib/i18n'

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
  },
  {
    href: '/blog',
    priority: 0.9,
    changeFrequency: 'weekly'
  },
  ...[...slugs].map(
    slug =>
      ({
        href: `/blog/${slug}`,
        priority: 0.8,
        changeFrequency: 'monthly'
      }) satisfies Entry
  )
]

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map(({ href, priority, changeFrequency }) => ({
    url: new URL(href, config.url).href,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        Object.values(Lang).map(lang => [
          lang,
          new URL(`${lang}${href}`, config.url).href
        ])
      )
    },
    priority,
    changeFrequency
  }))
}
