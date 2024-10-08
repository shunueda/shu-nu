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
    },
    notificationRequest: {
      unsupported: {
        title: {
          [Lang.EN]: 'Push notifications are not supported',
          [Lang.JA]: 'プッシュ通知はサポートされていません'
        } satisfies I18nElement<string>,
        description: {
          [Lang.EN]: 'Your browser does not support push notifications',
          [Lang.JA]: 'お使いのブラウザはプッシュ通知をサポートしていません'
        } satisfies I18nElement<string>
      },
      denied: {
        title: {
          [Lang.EN]: 'Push notifications are blocked',
          [Lang.JA]: 'プッシュ通知がブロックされています'
        } satisfies I18nElement<string>,
        description: {
          [Lang.EN]:
            'Please enable push notifications in your browser settings',
          [Lang.JA]: 'ブラウザの設定でプッシュ通知を有効にしてください'
        } satisfies I18nElement<string>
      },
      default: {
        title: {
          [Lang.EN]: 'Enable push notifications',
          [Lang.JA]: 'プッシュ通知を有効にする'
        } satisfies I18nElement<string>,
        description: {
          [Lang.EN]: 'Click here to enable push notifications',
          [Lang.JA]: 'こ��をクリックしてプッシュ通知を有効にする'
        } satisfies I18nElement<string>
      }
    }
  }
} as const
