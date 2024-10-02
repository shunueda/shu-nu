import type { NextConfig } from 'next'

export default {
  sassOptions: {
    implementation: 'sass-embedded',
    silenceDeprecations: ['legacy-js-api'],
  },
} satisfies NextConfig
