import type { Route } from 'next'
import pkg from '~/package.json' with { type: 'json' }

export function absolute(route: Route): string {
  return new URL(route, pkg.homepage).href
}
