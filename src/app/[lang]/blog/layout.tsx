import type { Metadata } from 'next'
import type { PushSubscription } from 'web-push'
import { NotificationRequester } from '#components/notification-requester'
import { config } from '#config'
import { database } from '#database'
import { i18n } from '#i18n'
import { type Lang, useI18n } from '#lib/i18n'
import type { LayoutProps } from '#types/props'

export interface Props {
  params: Promise<{
    lang: Lang
  }>
}

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  return {
    title: `${config.name} | Blog`,
    description: useI18n(i18n.blog.description, lang)
  } satisfies Metadata
}

export default async function Layout({
  children,
  params
}: LayoutProps & Props) {
  const { lang } = await params
  return (
    <section>
      <NotificationRequester
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
