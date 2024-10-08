export function isPushNotificationSupported() {
  try {
    return Notification && navigator.serviceWorker && PushManager
  } catch (_) {
    return false
  }
}
