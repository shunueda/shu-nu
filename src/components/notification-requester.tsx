'use client'
import { Bell } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '#components/ui/alert'
import type { Lang } from '#lib/i18n'

interface Props {
  lang: Lang
}

export function NotificationRequester({ lang }: Props) {
  return (
    <Alert
      onClickCapture={() => {
        alert('HELLO')
      }}
    >
      <Bell className="h-4 w-4" color={'#d5ba81'} strokeWidth={3} />
      <AlertTitle className="font-bold">通知を受け取る</AlertTitle>
      <AlertDescription>記事の投稿を通知致します。</AlertDescription>
    </Alert>
  )
}
