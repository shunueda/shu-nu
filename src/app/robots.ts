import type { MetadataRoute } from 'next'
import pkg from '~/package.json'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${pkg.homepage}/sitemap.xml`
  }
}
