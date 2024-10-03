import { type NextRequest, NextResponse } from 'next/server'
import { createIconSvg } from '#lib/icon'

const size = 512
const svg = await createIconSvg(size)

export async function GET(_: NextRequest) {
  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml'
    }
  })
}
