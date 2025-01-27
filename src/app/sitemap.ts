import type { MetadataRoute } from 'next'
import pkg from '~/package.json' with { type: 'json' }

const entries: MetadataRoute.Sitemap[number][] = [
  {
    url: '',
    priority: 1,
    changeFrequency: 'monthly'
  }
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return entries.map(it => ({
    ...it,
    url: new URL(it.url, pkg.homepage).href,
    lastModified: new Date()
  }))
}
