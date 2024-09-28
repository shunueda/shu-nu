import { cookies } from 'next/headers'

export enum Lang {
  EN = 'en',
  JA = 'ja',
}

const langKey = 'lang'

export async function getLang() {
  return ((await cookies()).get(langKey)?.value || Lang.EN) as Lang
}

export async function isEnglish() {
  return (await getLang()) === Lang.EN
}

export async function isJapanese() {
  return (await getLang()) === Lang.JA
}

export async function setLangCookie(lang: Lang) {
  return (await cookies()).set(langKey, lang)
}

export interface I18nElement<T> {
  [Lang.EN]: T
  [Lang.JA]: T
}

export async function useI18n<T>(element: I18nElement<T>) {
  return element[(await isEnglish()) ? Lang.EN : Lang.JA]
}
