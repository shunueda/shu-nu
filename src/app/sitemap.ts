import type { MetadataRoute } from 'next'
import { url } from '#assets/config.json'
import { slugs } from '#lib/blogs'
import { Lang } from '#lib/i18n'

interface Entry {
  href: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency']
}

const entries: Entry[] = [
  {
    href: '',
    priority: 1,
    changeFrequency: 'monthly',
  },
  {
    href: '/blog',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  ...slugs.map(
    slug =>
      ({
        href: `/blog/${slug}`,
        priority: 0.8,
        changeFrequency: 'monthly',
      }) satisfies Entry,
  ),
]

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map(({ href, priority, changeFrequency }) => ({
    url: new URL(href, url).href,
    lastModified: new Date(),
    alternates: {
      languages: {
        [Lang.EN]: new URL(`${Lang.EN}${href}`, url).href,
        [Lang.JA]: new URL(`${Lang.JA}${href}`, url).href,
      },
    },
    priority,
    changeFrequency,
  }))
}
