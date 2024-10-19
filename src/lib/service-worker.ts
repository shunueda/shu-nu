export async function registerOrGetServiceWorker() {
  const registrations = await navigator.serviceWorker.getRegistrations()
  if (registrations.length) {
    return registrations[0]
  }
  await navigator.serviceWorker.register('/service-worker.js', {
    scope: '/',
    type: 'module'
  })
  return navigator.serviceWorker.ready
}
