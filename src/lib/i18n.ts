export enum Lang {
  EN = 'en',
  JA = 'ja',
}

export const langs: readonly Lang[] = Object.values(Lang)

export function useI18nElement<T>(element: I18nElement<T>, lang: Lang): T {
  return element[lang]
}

export type I18nElement<T> = {
  [key in Lang]: T
}
