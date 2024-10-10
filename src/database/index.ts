import { createKysely } from '@vercel/postgres-kysely'
import type { Generated } from 'kysely'
import type { PushSubscription } from 'web-push'
import type { i18nBlogs } from '#lib/blogs'

interface SubscriptionsTable {
  id: Generated<number>
  subscription: PushSubscription
}

interface BlogsTable {
  id: Generated<number>
  i18n_blogs: typeof i18nBlogs
}

interface Database {
  subscriptions: SubscriptionsTable
  blogs: BlogsTable
}

export const database = createKysely<Database>()
