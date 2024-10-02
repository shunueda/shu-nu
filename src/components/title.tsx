import { cn } from '#lib/utils'
import classes from './title.module.scss'

interface Props {
  level?: 1 | 2 | 3
  children: string | string[]
}

export function Title({ level = 1, children }: Props) {
  const Tag = `h${level}` as const
  return (
    <Tag className={cn(classes.title, classes[`h${level}`])}>
      {Array.isArray(children) ? children.join('') : children}
    </Tag>
  )
}
