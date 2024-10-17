'use client'
import type { Route } from 'next'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Label } from '#components/ui/label'
import { Switch } from '#components/ui/switch'
import { Lang } from '#lib/i18n'

interface Props {
  lang: Lang
}

export function LanguageSwitch({ lang }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [checked, setChecked] = useState(lang === Lang.JA)
  return (
    <>
      <Label className='mb-1'>{Lang.EN}</Label>
      <Switch
        checked={checked}
        onCheckedChange={checked => {
          setChecked(checked)
          router.replace(
            pathname.replace(
              `/${lang}`,
              `/${checked ? Lang.JA : Lang.EN}`
            ) as Route
          )
        }}
      />
      <Label className='mb-1'>{Lang.JA}</Label>
    </>
  )
}
