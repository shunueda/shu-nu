import AcceptLanguage from 'accept-language'
import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse
} from 'next/server'
import { Header } from '#lib/header'
import { Lang, langs } from '#lib/i18n'

AcceptLanguage.languages(langs as string[])

export const config: MiddlewareConfig = {
  matcher: ['/', '/blog/:path*']
}

const cookieLangKey = 'lang'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameLang = langs.find(lang => pathname.startsWith(`/${lang}`))
  if (pathnameLang) {
    const response = NextResponse.next()
    response.cookies.set(cookieLangKey, pathnameLang)
    return response
  }
  const lang = getUserLang(request)
  const url = new URL(`/${lang}${pathname}`, request.url)
  return NextResponse.redirect(url)
}

function getUserLang(request: NextRequest) {
  return (
    request.cookies.get(cookieLangKey)?.value ??
    AcceptLanguage.get(request.headers.get(Header.ACCEPT_LANGUAGE)) ??
    Lang.EN
  )
}
