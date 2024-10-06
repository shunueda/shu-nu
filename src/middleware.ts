import AcceptLanguage from 'accept-language'
import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse
} from 'next/server'
import { Cookie } from '#lib/cookie'
import { Header } from '#lib/header'
import { Lang, langs } from '#lib/i18n'

AcceptLanguage.languages(langs as string[])

export const config = {
  matcher: ['/', '/blog/:path*']
} satisfies MiddlewareConfig

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
  return (
    request.cookies.get(Cookie.LANG)?.value ??
    AcceptLanguage.get(request.headers.get(Header.ACCEPT_LANGUAGE)) ??
    Lang.EN
  )
}
