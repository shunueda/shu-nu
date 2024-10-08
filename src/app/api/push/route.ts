import { type NextRequest, NextResponse } from 'next/server'
import { sendNotification } from 'web-push'
import { config } from '#config'
import { database } from '#database'
import type { NotificationPayload } from '#types/notification'

export async function GET(_: NextRequest) {
  const subscriptions = await database
    .selectFrom('subscriptions')
    .selectAll()
    .execute()
  subscriptions.forEach(({ subscription }) => {
    const payload: NotificationPayload = {
      title: 'WebPush Notification!',
      body: 'Hello World',
      icon: '/icon.png'
    }
    sendNotification(subscription, JSON.stringify(payload), {
      vapidDetails: {
        subject: `mailto:${config.email}`,
        publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        privateKey: process.env.VAPID_PRIVATE_KEY
      }
    })
  })
  return NextResponse.json({
    message: `${subscriptions.length} messages sent!`
  })
}
