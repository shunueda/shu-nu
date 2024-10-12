'use client'
import { Bell, BellMinus, BellOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAsyncEffect } from 'use-async-effect'
import type { PushSubscription } from 'web-push'
import { Alert, AlertDescription, AlertTitle } from '#components/ui/alert'
import { i18n } from '#i18n'
import { type I18nElement, type Lang, useI18n } from '#lib/i18n'
import { isPushNotificationSupported } from '#lib/notification'
import { registerOrGetServiceWorker } from '#lib/service-worker'
import { cn } from '#lib/utils'
import type { Color } from '#types'
import type { NegativeNotificationPermission } from '#types/notification'

interface Props {
  lang: Lang
  saveSubscriptionAction: (subscription: PushSubscription) => Promise<void>
}

const icons: Record<
  NegativeNotificationPermission,
  {
    Element: typeof Bell
    color: Color
  }
> = {
  default: {
    Element: Bell,
    color: '#d5ba81'
  },
  denied: {
    Element: BellOff,
    color: '#c04c4c'
  },
  unsupported: {
    Element: BellMinus,
    color: '#548380'
  }
}

export function NotificationRequest({ lang, saveSubscriptionAction }: Props) {
  const [hidden, setHidden] = useState(true)
  const [content, setContent] = useState<{
    title: I18nElement<string>
    description: I18nElement<string>
  }>()
  const [permission, setPermission] = useState<
    NotificationPermission | 'unsupported'
  >('default')

  useEffect(() => {
    if (isPushNotificationSupported()) {
      setPermission(Notification.permission)
      return
    }
    setPermission('unsupported')
  }, [])

  useAsyncEffect(async () => {
    if (permission !== 'granted') {
      setHidden(false)
      const config = i18n.blog.notificationRequest
      setContent(config[permission])
      return
    }
    setHidden(true)
    const { pushManager } = await registerOrGetServiceWorker()
    const subscription = await pushManager.subscribe({
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      userVisibleOnly: true
    })
    await saveSubscriptionAction(subscription.toJSON() as PushSubscription)
  }, [permission])

  if (permission === 'granted') {
    return null
  }

  const Icon = icons[permission]
  return (
    <Alert
      className={cn('cursor-pointer', 'mb-6', { hidden })}
      onClickCapture={async () => {
        if (permission === 'unsupported') {
          return
        }
        const result = await Notification.requestPermission()
        setPermission(result)
      }}
    >
      <div className='flex items-center'>
        <Icon.Element
          className='w-12 h-12 md:w-8 md:h-8'
          strokeWidth={3}
          color={Icon.color}
        />
        <div className='ml-4'>
          <AlertTitle className='font-bold'>
            {content?.title && useI18n(content.title, lang)}
          </AlertTitle>
          <AlertDescription>
            {content?.description && useI18n(content.description, lang)}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  )
}
