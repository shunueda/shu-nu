import type { MetadataRoute } from 'next'
import pkg from '~/package.json' with { type: 'json' }

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: new URL('sitemap.xml', pkg.homepage).href
  }
}
