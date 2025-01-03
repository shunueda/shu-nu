import type { I18nElement } from '#lib/i18n'

export const i18n = {
  introduction: {
    en: [
      'Software engineer. Passionate about using technology to solve real-world problems.'
    ],
    ja: ['ソフトウェアエンジニア。DevOps が得意。']
  } satisfies I18nElement<string[]>
} as const
