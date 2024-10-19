import { pick } from 'accept-language-parser'
import { type NextRequest, NextResponse } from 'next/server'
import { Cookie } from '#lib/cookie'
import { Header } from '#lib/header'
import { Lang, langs } from '#lib/i18n'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // skip static files
  if (pathname.includes('.')) {
    return NextResponse.next()
  }
  // check if the path starts with a language code
  // if so, set the language cookie
  const pathlang = langs.find(lang => pathname.startsWith(`/${lang}`))
  if (pathlang) {
    const response = NextResponse.next()
    response.cookies.set(Cookie.LANG, pathlang)
    return response
  }
  // redirect to the path with the language code
  const lang = getLang(request)
  const url = new URL(
    `/${lang}${pathname.endsWith('/') ? pathname.slice(0, -1) : pathname}`,
    request.url
  )
  return NextResponse.redirect(url)
}

/**
 * Get the language from the request
 * Precendence:
 * 1. {@link Cookie.LANG} cookie
 * 2. {@link Header.ACCEPT_LANGUAGE} header
 * 3. {@link Lang.EN} default
 */
function getLang(request: NextRequest) {
  return (
    request.cookies.get(Cookie.LANG)?.value ||
    pick(langs as Lang[], request.headers.get(Header.ACCEPT_LANGUAGE) || '') ||
    Lang.EN
  )
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
