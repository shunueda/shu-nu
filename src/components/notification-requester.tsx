'use client'
import { Bell } from 'lucide-react'
import type { PushSubscription } from 'web-push'
import { Alert, AlertDescription, AlertTitle } from '#components/ui/alert'
import type { Lang } from '#lib/i18n'
import { isNotificationSupported } from '#lib/notification'
import { isServiceWorkerActive, resetServiceWorker } from '#lib/service-worker'

interface Props {
  lang: Lang
  saveSubscriptionAction: (subscription: PushSubscription) => Promise<void>
}

export function NotificationRequester({ lang, saveSubscriptionAction }: Props) {
  return (
    <Alert
      className="cursor-pointer"
      onClickCapture={async () => {
        if (!isNotificationSupported()) {
          return
        }
        if (await isServiceWorkerActive()) {
          return
        }
        if ((await window.Notification.requestPermission()) !== 'granted') {
          return
        }
        const swRegistration = await resetServiceWorker()
        const subscription = await swRegistration.pushManager.subscribe({
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
          userVisibleOnly: true
        })
        await saveSubscriptionAction(subscription.toJSON() as PushSubscription)
      }}
    >
      <Bell className="h-4 w-4" color={'#d5ba81'} strokeWidth={3} />
      <AlertTitle className="font-bold">通知を受け取る</AlertTitle>
      <AlertDescription>記事の投稿を通知致します。</AlertDescription>
    </Alert>
  )
}
