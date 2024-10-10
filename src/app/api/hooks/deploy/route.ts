import { type NextRequest, NextResponse } from 'next/server'
import { blogFiles } from '#lib/blogs'
import { Header } from '#lib/header'

export function POST(req: NextRequest) {
  const token = req.headers.get(Header.AUTHORIZATION)?.split(' ').at(1)
  // if (token !== process.env.BEARER_TOKEN) {
  //   return NextResponse.next({
  //     status: 401,
  //     statusText: 'Unauthorized'
  //   })
  // }
  console.log(blogFiles)
  return NextResponse.next({
    status: 200,
    statusText: 'success'
  })
}
