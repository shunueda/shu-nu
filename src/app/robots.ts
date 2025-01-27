import type { MetadataRoute, Route } from 'next'
import { absolute } from '#lib/utils'

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: absolute('sitemap.xml' as Route)
  }
}
