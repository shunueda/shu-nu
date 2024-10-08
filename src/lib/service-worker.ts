import { config } from '#config'

export async function registerServiceWorker() {
  await navigator.serviceWorker.register(`/${config.serviceWorker}.js`, {
    scope: '/'
  })
  return navigator.serviceWorker.ready
}

export async function unregisterServiceWorkers() {
  const registrations = await navigator.serviceWorker.getRegistrations()
  console.log('Unregistering service workers:', registrations.length)
  return await Promise.all(
    registrations.map(registration => registration.unregister())
  )
}

export async function resetServiceWorker() {
  await unregisterServiceWorkers()
  return await registerServiceWorker()
}
