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

export async function generateI18nElement<T>(
  generator: (lang: Lang) => Promise<T> | T
): Promise<I18nElement<T>> {
  const entries = await Promise.all(
    langs.map(async lang => [lang, await generator(lang)])
  )
  return Object.fromEntries(entries)
}
