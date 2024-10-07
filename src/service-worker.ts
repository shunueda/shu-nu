import type { NotificationPayload } from '#types/notification-payload'

const scope = new ServiceWorkerGlobalScope()

scope.onpush = async event => {
  if (!event.data) {
    return
  }
  const { title, ...options } = (await event.data.json()) as NotificationPayload
  await scope.registration.showNotification(
    title,
    options satisfies NotificationOptions
  )
}
