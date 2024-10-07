export function isNotificationSupported() {
  return window.Notification && navigator.serviceWorker && window.PushManager
}
