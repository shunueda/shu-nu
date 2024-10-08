import type { NextConfig } from 'next'

export default {
  output: 'standalone',
  sassOptions: {
    implementation: 'sass-embedded',
    silenceDeprecations: ['legacy-js-api']
  },
  experimental: {
    typedRoutes: true
  }
} satisfies NextConfig
