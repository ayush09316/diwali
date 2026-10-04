import type { AnchorHTMLAttributes, CSSProperties, ElementType, ReactNode } from 'react'
import { only } from '../utils'

type Fit = [x0: number, x1: number, top: number]

type Props = Omit<AnchorHTMLAttributes<HTMLElement>, 'children' | 'className' | 'style'> & {
  as?: ElementType
  fit?: Fit
  fitM?: Fit
  refText?: string
  inGroup?: boolean
  className?: string
  style?: CSSProperties
  children: ReactNode
}

export function FitText({ as: Tag = 'p', fit, fitM, refText, inGroup, className = '', style, children, ...attrs }: Props) {
  const visibility = inGroup ? '' : only(fit, fitM)
  return (
    <Tag
      {...attrs}
      className={`${inGroup ? 'r' : 'a'} fit${visibility} ${className}`}
      data-fit={fit?.join(' ')}
      data-fit-m={fitM?.join(' ')}
      data-ref={refText}
      style={style}
    >
      {children}
    </Tag>
  )
}
