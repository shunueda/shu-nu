import { type I18nElement, Lang } from '#lib/i18n'
import type { NegativeNotificationPermission } from '#types/notification'

export const i18n = {
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
    },
    notFound: {
      title: {
        [Lang.EN]: 'Not available in this language',
        [Lang.JA]: 'この言語では利用できません'
      },
      content: {
        [Lang.EN]: 'Please select another language',
        [Lang.JA]: '右上のスイッチから他の言語を選択してください'
      }
    },
    notificationRequest: {
      unsupported: {
        title: {
          [Lang.EN]: 'Notifications not supported',
          [Lang.JA]: '通知がサポートされていません'
        },
        description: {
          [Lang.EN]:
            'If you are using a mobild device, please open in your browser from the menu in the bottom right corner.',
          [Lang.JA]:
            'スマートフォンをお使いでしたら、右下のメニューからブラウザで開いてください。'
        }
      },
      denied: {
        title: {
          [Lang.EN]: 'Notifications blocked',
          [Lang.JA]: '通知はブロックされています'
        },
        description: {
          [Lang.EN]:
            'To enable notifications again, please allow them from your browser settings.',
          [Lang.JA]:
            '再度有効にするには、ブラウザの設定から通知を許可してください。'
        }
      },
      default: {
        title: {
          [Lang.EN]: 'Enable notifications',
          [Lang.JA]: '通知を有効にする'
        },
        description: {
          [Lang.EN]:
            'Click to enable notifications and receive updates about new articles.',
          [Lang.JA]:
            'ぜひ、クリックして有効にしてください。記事の投稿をお知らせします。'
        }
      }
    } satisfies Record<
      NegativeNotificationPermission,
      {
        title: I18nElement<string>
        description: I18nElement<string>
      }
    >
  }
} as const
