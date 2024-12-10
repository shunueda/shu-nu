import { type I18nElement, Lang } from '#lib/i18n'

export const i18n = {
  introduction: {
    [Lang.EN]: [
      'Software engineer. Passionate about using technology to solve real-world problems.'
    ],
    [Lang.JA]: ['ソフトウェアエンジニア。DevOps が得意。']
  } satisfies I18nElement<string[]>
} as const
