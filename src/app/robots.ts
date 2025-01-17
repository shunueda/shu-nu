import type { MetadataRoute } from 'next'
import pkg from '~/package.json' with { type: 'json' }

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: new URL('sitemap.xml', pkg.homepage).toString()
  }
}
