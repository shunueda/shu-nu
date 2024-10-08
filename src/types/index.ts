import type { CSSProperties } from 'react'

export type Color = Exclude<CSSProperties['color'], undefined>
