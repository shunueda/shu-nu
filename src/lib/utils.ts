import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomKey() {
  return Math.random().toString(36).substring(2, 10)
}

export function formatDate(date: Date) {
  return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/')
}
