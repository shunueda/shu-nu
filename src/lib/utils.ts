import type { Route } from 'next'
import { Endpoint } from '#lib/endpoint'

export function absolute(route: Route): string {
  return new URL(route, Endpoint.ROOT).href
}
