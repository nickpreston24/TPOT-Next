import { CSSProperties } from 'react'

export function disableMe(disabled: boolean): CSSProperties {
  return {
    opacity: disabled ? 0.25 : 1,
    pointerEvents: disabled ? 'none' : 'initial',
  }
}

export function hideMe(hidden: boolean): CSSProperties {
  return {
    visibility: hidden ? 'hidden' : 'initial',
    pointerEvents: hidden ? 'none' : 'initial',
  }
}
