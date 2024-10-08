import { config } from '#config'

export async function registerServiceWorker() {
  const registrations = await navigator.serviceWorker.getRegistrations()
  if (registrations.length) {
    return registrations[0]
  }
  await navigator.serviceWorker.register(`/${config.serviceWorker}.js`, {
    scope: '/',
    type: 'module'
  })
  return navigator.serviceWorker.ready
}
