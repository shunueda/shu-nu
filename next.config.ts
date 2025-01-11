import type { NextConfig } from 'next'

export default {
  experimental: {
    typedRoutes: true,
    typedEnv: true
  }
} satisfies NextConfig
