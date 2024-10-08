import { config } from '#config'

export async function isServiceWorkerActive() {
  const registration = await navigator.serviceWorker.getRegistration()
  return (
    registration !== undefined &&
    registration.installing === null &&
    registration.waiting === null &&
    registration.active !== null
  )
}

export async function registerServiceWorker() {
  await navigator.serviceWorker.register(`/${config.serviceWorker}.js`, {
    scope: '/'
  })
  return navigator.serviceWorker.ready
}

export async function unregisterServiceWorkers() {
  const registrations = await navigator.serviceWorker.getRegistrations()
  return await Promise.all(
    registrations.map(registration => registration.unregister())
  )
}

export async function resetServiceWorker() {
  await unregisterServiceWorkers()
  return await registerServiceWorker()
}
