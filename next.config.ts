import type { NextConfig } from 'next'

export default {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com'
      }
    ]
  },
  experimental: {
    typedRoutes: true,
    typedEnv: true
  }
} satisfies NextConfig
