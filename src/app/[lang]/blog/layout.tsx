import type { Metadata } from 'next'
import type { PushSubscription } from 'web-push'
import pkg from '~package.json'
import { NotificationRequest } from '#components/notification-request'
import { database } from '#database'
import { i18n } from '#i18n'
import { type Lang, useI18n } from '#lib/i18n'
import type { LayoutProps } from '#types/props'

export interface Props {
  params: Promise<{
    lang: Lang
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: {
      template: `${pkg.author.name} - %s`,
      default: 'Blog'
    },
    description: useI18n(i18n.blog.description, lang)
  }
}

export default async function Layout({
  children,
  params
}: LayoutProps & Props) {
  const { lang } = await params
  return (
    <section>
      <NotificationRequest
        lang={lang}
        saveSubscriptionAction={async (subscription: PushSubscription) => {
          'use server'
          await database
            .insertInto('subscriptions')
            .values({ subscription })
            .execute()
        }}
      />
      <h1>Blog.</h1>
      <div className='mt-4'>{children}</div>
    </section>
  )
}
