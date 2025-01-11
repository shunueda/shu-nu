import { equal, ok } from 'node:assert'
import { describe, test } from 'node:test'
import { NextRequest } from 'next/server'
import pkg from '~/package.json' with { type: 'json' }
import { Cookie } from '#lib/cookie'
import { Header } from '#lib/header'
import { Lang, langs } from '#lib/i18n'
import { Status } from '#lib/status'
import { middleware } from '#middleware'

interface Scenario {
  readonly name: string
  readonly path: string
  readonly destination: string
  readonly status: Status
  readonly headers: Record<string, string>
  readonly cookies: Record<string, string>
}

describe(import.meta.filename, () => {
  ;[
    {
      name: 'Default',
      path: '/',
      destination: `/${Lang.EN}`,
      status: Status.REDIRECT,
      headers: {},
      cookies: {}
    },
    ...['', '/blog'].flatMap(path =>
      [
        langs.map(
          lang =>
            ({
              name: `Pathlang - ${lang}`,
              path: `/${lang}${path}`,
              destination: `/${lang}${path}`,
              status: Status.OK,
              headers: {},
              cookies: {}
            }) satisfies Scenario
        ),
        langs.map(
          lang =>
            ({
              name: `Header - ${lang}`,
              path,
              destination: `/${lang}${path}`,
              status: Status.REDIRECT,
              headers: {
                [Header.ACCEPT_LANGUAGE]: lang
              },
              cookies: {}
            }) satisfies Scenario
        ),
        langs.map(
          lang =>
            ({
              name: `Cookie - ${lang}`,
              path,
              destination: `/${lang}${path}`,
              status: Status.REDIRECT,
              headers: {},
              cookies: {
                [Cookie.LANG]: lang
              }
            }) satisfies Scenario
        ),
        langs.map(
          lang =>
            ({
              name: `Cookie takes precedence over header - ${lang}`,
              path,
              destination: `/${lang}${path}`,
              status: Status.REDIRECT,
              headers: {
                [Header.ACCEPT_LANGUAGE]: lang === Lang.EN ? Lang.JA : Lang.EN
              },
              cookies: {
                [Cookie.LANG]: lang
              }
            }) satisfies Scenario
        ),
        langs.map(lang => {
          const other = lang === Lang.EN ? Lang.JA : Lang.EN
          return {
            name: `Path takes precedence over cookie & header - ${lang}`,
            path: `/${lang}${path}`,
            destination: `/${lang}${path}`,
            status: Status.OK,
            headers: {
              [Header.ACCEPT_LANGUAGE]: other
            },
            cookies: {
              [Cookie.LANG]: other
            }
          } satisfies Scenario
        })
      ].flat()
    )
  ].forEach(({ name, path, destination, status, headers, cookies }) => {
    test(`${name}: ${path} --[ ${Status[status]} ]--> ${destination}`, async () => {
      const request = new NextRequest(pkg.homepage + path, { headers })
      Object.entries(cookies).forEach(args => {
        request.cookies.set(...args)
      })

      const response = middleware(request)

      equal(response.status, status)
      switch (status) {
        case Status.REDIRECT: {
          equal(
            response.headers.get(Header.LOCATION),
            pkg.homepage + destination
          )
          break
        }
        case Status.OK: {
          ok(
            destination.startsWith(
              `/${response.cookies.get(Cookie.LANG)?.value}`
            )
          )
          break
        }
      }
    })
  })
})
