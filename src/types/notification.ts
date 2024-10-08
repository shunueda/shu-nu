export interface NotificationPayload extends NotificationOptions {
  title: string
}

export type NegativeNotificationPermission =
  | Exclude<NotificationPermission, 'granted'>
  | 'unsupported'
