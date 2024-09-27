import { cn } from '../lib/utils'
import classes from './title.module.scss'

interface Props {
  level?: 1 | 2
  children: string
}

export function Title({ level = 1, children }: Props) {
  return <h1 className={cn(classes.title, classes[`h${level}`])}>{children}</h1>
}
