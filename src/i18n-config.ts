import { type I18nElement, Lang } from '#lib/i18n'

export const i18nConfig = {
  introduction: {
    [Lang.EN]: [
      'Software engineer. Passionate about using technology to solve real-world problems.',
      'Interested in mathematics (particularly structures), functional programming, ethics, apologetics, and atheism.'
    ],
    [Lang.JA]: [
      'ソフトウェアエンジニア。DevOps が得意。',
      '数学（構造）、関数型プログラミング、倫理学、弁証学、無神論について。'
    ]
  } satisfies I18nElement<string[]>,
  blog: {
    description: {
      [Lang.EN]:
        'Faith within non-belief — seeking harmony between Religion and Ethics',
      [Lang.JA]:
        '無信仰の中にある信仰 — 宗教と倫理の調和を求めて。無神論者の視点から、共存を追究する。'
    } satisfies I18nElement<string>,
    langNotAvailable: {
      title: {
        [Lang.EN]: 'Not available in this language',
        [Lang.JA]: 'この言語では利用できません'
      } satisfies I18nElement<string>,
      source: {
        [Lang.EN]: 'Please select another language',
        [Lang.JA]: '右上のスイッチから他の言語を選択してください'
      } satisfies I18nElement<string>
    }
  }
} as const
