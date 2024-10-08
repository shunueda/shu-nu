import type { NotificationPayload } from '#types/notification-payload'

const scope = self as WorkerGlobalScope as ServiceWorkerGlobalScope

scope.addEventListener('push', async (event: PushEvent) => {
  if (!event.data) {
    return
  }
  const json = await event.data.json()
  console.dir(json, {
    depth: null
  })
  const { title, ...options } = json as NotificationPayload
  await scope.registration.showNotification(
    title,
    options satisfies NotificationOptions
  )
})
