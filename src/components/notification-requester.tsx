'use client'
import { Bell } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAsyncEffect } from 'use-async-effect'
import type { PushSubscription } from 'web-push'
import { Alert, AlertDescription, AlertTitle } from '#components/ui/alert'
import { i18nConfig } from '#config/i18n'
import {
  type I18nElement,
  type Lang,
  createEmptyI18nElement,
  useI18nElement
} from '#lib/i18n'
import { isPushNotificationSupported } from '#lib/notification'
import { resetServiceWorker } from '#lib/service-worker'

interface Props {
  lang: Lang
  saveSubscriptionAction: (subscription: PushSubscription) => Promise<void>
}

interface Content {
  title: I18nElement<string>
  description: I18nElement<string>
}

export function NotificationRequester({ lang, saveSubscriptionAction }: Props) {
  const [content, setContent] = useState({
    title: createEmptyI18nElement(),
    description: createEmptyI18nElement()
  })
  const [permission, setPermission] = useState<
    NotificationPermission | 'unsupported'
  >('default')

  useEffect(() => {
    if (!isPushNotificationSupported()) {
      setPermission('unsupported')
      return
    }
    setPermission(Notification.permission)
  }, [])

  useAsyncEffect(async () => {
    if (permission !== 'granted') {
      const config = i18nConfig.blog.notificationRequest
      setContent(config[permission as keyof typeof config])
      return
    }
    const swRegistration = await resetServiceWorker()
    const subscription = await swRegistration.pushManager.subscribe({
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      userVisibleOnly: true
    })
    await saveSubscriptionAction(subscription.toJSON() as PushSubscription)
  }, [permission])

  if (permission === 'granted') {
    return null
  }

  return (
    <Alert
      className="cursor-pointer my-4"
      onClickCapture={async () => {
        const result = await Notification.requestPermission()
        setPermission(result)
      }}
    >
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
