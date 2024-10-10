import { type NextRequest, NextResponse } from 'next/server'
import { database } from '#database'
import { i18nBlogs } from '#lib/blogs'
import { Header } from '#lib/header'

export async function POST(req: NextRequest) {
  const token = req.headers.get(Header.AUTHORIZATION)?.split(' ').at(1)
  if (token !== process.env.BEARER_TOKEN) {
    return NextResponse.json(
      {},
      {
        status: 401,
        statusText: 'Unauthorized'
      }
    )
  }
  await database
    .insertInto('blogs')
    .values({
      i18n_blogs: i18nBlogs
    })
    .execute()
  return NextResponse.json(
    {},
    {
      status: 201,
      statusText: 'Created'
    }
  )
}
