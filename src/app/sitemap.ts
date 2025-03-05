import type { MetadataRoute, Route } from 'next'
import { absolute } from '#lib/utils'

const entries: MetadataRoute.Sitemap = [
  {
    url: '/' satisfies Route,
    priority: 1,
    changeFrequency: 'weekly'
  }
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return entries.map(it => ({
    ...it,
    url: absolute(it.url as Route),
    lastModified: new Date()
  }))
}
