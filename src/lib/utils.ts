import type { Route } from 'next'
import { Endpoint } from '#lib/endpoint'
import type { File } from '#lib/file'

export function absolute(route: Route): string {
  return new URL(route, Endpoint.ROOT).href
}

export function publicFile(file: File): Route {
  return file.replace('public', '') as Route
}
