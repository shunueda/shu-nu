import type { Route } from 'next'
import { Endpoint } from '#lib/endpoint'
import type { File } from '#lib/file'

export function absolute(route: Route): string {
  return new URL(route, Endpoint.ROOT).href
}

export function publicFile(path: File): Route {
  return path.toString().replace('public', '') as Route
}
