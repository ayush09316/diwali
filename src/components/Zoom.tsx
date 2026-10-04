import type { CSSProperties } from 'react'

type Props = {
  src: string
  alt?: string
  className?: string
  style?: CSSProperties
  shaped?: boolean
}

export function Zoom({ src, alt = '', className = '', style, shaped = false }: Props) {
  const maskStyle = shaped ? ({ '--mask': `url(${src})` } as CSSProperties) : undefined
  return (
    <div className={`zoom${shaped ? ' shaped' : ''} ${className}`} style={{ ...style, ...maskStyle }}>
      <img src={src} alt={alt} />
    </div>
  )
}
