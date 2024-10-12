export function isPushNotificationSupported() {
  return (
    window.Notification && window.navigator?.serviceWorker && window.PushManager
  )
}
