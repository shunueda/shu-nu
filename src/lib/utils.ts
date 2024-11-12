import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const { format } = Intl.DateTimeFormat()

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function notEmpty<T>(value: T | null | undefined): value is T {
  return !(value === null || value === undefined)
}

export function fixSpacing(string: string) {
  return string
    .replaceAll('「', ' 「')
    .replaceAll('」', '」 ')
    .replaceAll('『', ' 「')
    .replaceAll('』', '」 ')
}
