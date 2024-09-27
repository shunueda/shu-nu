import { cookies } from 'next/headers'
import { Cookie } from './Cookie'

export enum Lang {
  EN = 'en',
  JA = 'ja',
}

export async function isEnglish() {
  return (await cookies()).get(Cookie.LANG)?.value !== Lang.JA
}

export async function isJapanese() {
  return !(await isEnglish())
}

interface I18nElement<T> {
  [Lang.EN]: T
  [Lang.JA]: T
}

export async function i18n<T>(element: I18nElement<T>) {
  return element[(await isEnglish()) ? Lang.EN : Lang.JA]
}
