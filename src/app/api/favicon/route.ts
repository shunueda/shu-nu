import { readFile } from 'node:fs/promises'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest) {
  const svg = await readFile('out/favicon.svg')
  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml'
    }
  })
}
