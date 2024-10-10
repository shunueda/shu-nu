import { createKysely } from '@vercel/postgres-kysely'
import type { Generated } from 'kysely'
import type { PushSubscription } from 'web-push'

interface SubscriptionsTable {
  id: Generated<number>
  subscription: PushSubscription
}

interface Database {
  subscriptions: SubscriptionsTable
}

export const database = createKysely<Database>()
