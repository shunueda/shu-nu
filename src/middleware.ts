import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse
} from 'next/server'
import { Cookie } from '#lib/cookie'
import { Header } from '#lib/header'
import { Lang, langs } from '#lib/i18n'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameLang = langs.find(lang => pathname.startsWith(`/${lang}`))
  if (pathnameLang) {
    const response = NextResponse.next()
    response.cookies.set(Cookie.LANG, pathnameLang)
    return response
  }
  const lang = getUserLang(request)
  const url = new URL(`/${lang}${pathname}`, request.url)
  return NextResponse.redirect(url)
}

function getUserLang(request: NextRequest) {
  const cookieLang = request.cookies.get(Cookie.LANG)?.value
  if (cookieLang) {
    return cookieLang as Lang
  }
  const languages = new Negotiator({
    headers: {
      [Header.ACCEPT_LANGUAGE]:
        request.headers.get(Header.ACCEPT_LANGUAGE) || ''
    }
  }).languages()
  return match(languages, langs, Lang.EN)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
} satisfies MiddlewareConfig
