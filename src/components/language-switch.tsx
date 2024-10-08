'use client'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Label } from '#components/ui/label'
import { Switch } from '#components/ui/switch'
import { Lang } from '#lib/i18n'

interface Props {
  lang: Lang
}

export function LanguageSwitch({ lang }: Props) {
  const pathname = usePathname()
  return (
    <>
      <Label className='mb-2'>{Lang.EN}</Label>
      <Link
        href={
          pathname.replace(
            `/${lang}`,
            lang === Lang.EN ? `/${Lang.JA}` : `/${Lang.EN}`
          ) as Route
        }
      >
        <Switch checked={lang === Lang.JA} />
      </Link>
      <Label className='mb-2'>{Lang.JA}</Label>
    </>
  )
}
