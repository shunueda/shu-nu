import { basename, extname } from 'node:path'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function key() {
  return Math.random().toString(36).substring(2, 10)
}

export function stripExtension(path: string) {
  return basename(path, extname(path))
}

export function formatDate(date: Date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}
