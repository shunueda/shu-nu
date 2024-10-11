import type { NotificationPayload } from '#types/notification'

const scope = window.self as WorkerGlobalScope as ServiceWorkerGlobalScope

scope.addEventListener('push', async ({ data }: PushEvent) => {
  if (!data) {
    return
  }
  const { title, ...options } = (await data.json()) as NotificationPayload
  await scope.registration.showNotification(
    title,
    options satisfies NotificationOptions
  )
})
