'use client'
import { Bell } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { PushSubscription } from 'web-push'
import { Alert, AlertDescription, AlertTitle } from '#components/ui/alert'
import { type I18nElement, Lang, useI18nElement } from '#lib/i18n'
import { isPushNotificationSupported } from '#lib/notification'
import { isServiceWorkerActive, resetServiceWorker } from '#lib/service-worker'

interface Props {
  lang: Lang
  saveSubscriptionAction: (subscription: PushSubscription) => Promise<void>
}

interface Content {
  title: I18nElement<string>
  description: I18nElement<string>
}

enum WorkerState {
  NOT_SUPPORTED = 'not-supported',
  ACTIVE = 'active',
  LOADING = 'loading',
  INACTIVE = 'inactive'
}

export function NotificationRequester({ lang, saveSubscriptionAction }: Props) {
  const [workerState, setWorkerState] = useState<WorkerState>(
    WorkerState.LOADING
  )
  const [notifPerm, setNotifPerm] = useState<NotificationPermission>()
  const [content, setContent] = useState<Content>({
    title: {
      [Lang.EN]: '',
      [Lang.JA]: ''
    },
    description: {
      [Lang.EN]: '',
      [Lang.JA]: ''
    }
  })

  useEffect(() => {
    // Check for notification support
    if (!isPushNotificationSupported()) {
      setContent({
        title: {
          [Lang.EN]: 'Notifications are not supported',
          [Lang.JA]: '通知はサポートされていません'
        },
        description: {
          [Lang.EN]: 'Your browser does not support notifications',
          [Lang.JA]: 'お使いのブラウザは通知をサポートしていません'
        }
      })
      setWorkerState(WorkerState.NOT_SUPPORTED)
      return
    }

    isServiceWorkerActive().then(active => {
      if (active) {
        setWorkerState(WorkerState.ACTIVE)
      } else {
        setWorkerState(WorkerState.INACTIVE)
      }
    })

    setNotifPerm(Notification.permission)
    if (Notification.permission !== 'granted') {
      setContent({
        title: {
          [Lang.EN]: 'Enable notifications',
          [Lang.JA]: '通知を有効にする'
        },
        description: {
          [Lang.EN]: 'Click here to enable notifications',
          [Lang.JA]: '通知を有効にするにはここをクリック'
        }
      })
    }
  }, [])

  async function handlePermissionRequest() {
    // Request notification permission
    if (notifPerm !== 'granted') {
      const permission = await Notification.requestPermission()
      setNotifPerm(permission)
      if (permission !== 'granted') {
        return
      }
    }

    // Activate the service worker and subscribe to push notifications
    setWorkerState(WorkerState.LOADING)
    const { pushManager } = await resetServiceWorker()
    const subscription = await pushManager.subscribe({
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      userVisibleOnly: true
    })
    await saveSubscriptionAction(subscription.toJSON() as PushSubscription)
    setWorkerState(WorkerState.ACTIVE)
  }

  if (notifPerm === 'granted' && workerState === WorkerState.ACTIVE) {
    return null
  }

  return (
    <Alert className="cursor-pointer" onClickCapture={handlePermissionRequest}>
      <div className="flex items-center">
        <Bell className="h-4 w-4 mr-2" color={'#d5ba81'} strokeWidth={3} />
        <div>
          <AlertTitle className="font-bold">
            {useI18nElement(content.title, lang)}
          </AlertTitle>
          <AlertDescription>
            {useI18nElement(content.description, lang)}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  )
}
