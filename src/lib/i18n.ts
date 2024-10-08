export enum Lang {
  EN = 'en',
  JA = 'ja'
}

export const langs: readonly Lang[] = Object.values(Lang)

export function useI18nElement<T>(element: I18nElement<T>, lang: Lang): T {
  if (!lang) {
    return element[Lang.EN]
  }
  return element[lang]
}

export type I18nElement<T> = {
  [key in Lang]: T
}

export function createEmptyI18nElement() {
  return {
    [Lang.EN]: '',
    [Lang.JA]: ''
  }
}
