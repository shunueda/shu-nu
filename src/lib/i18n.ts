export enum Lang {
  EN = 'en',
  JA = 'ja'
}

export const langs: readonly Lang[] = Object.values(Lang)

export function useI18n<T>(element: I18nElement<T>, lang: Lang): T {
  return element[lang] || element[Lang.EN]
}

export type I18nElement<T> = {
  [_ in Lang]: T
}
