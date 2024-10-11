import type { NextConfig } from 'next'

export default {
  output: 'standalone',
  experimental: {
    typedRoutes: true,
    typedEnv: true
  }
} satisfies NextConfig
