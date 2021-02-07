import { ReactNode } from 'react'

export type HasRenderProp<T> = T extends { render: (props: any) => ReactNode } ? T : never
export type HasChildrenProp<T> = T extends { children: (props: any) => ReactNode } ? T : never
export type IsFunction<T> = T extends (...args: any[]) => any ? T : never

export const hasRender = <T extends {}>(value: T): value is HasRenderProp<T> =>
  'render' in value && isFunction((value as HasRenderProp<T>).render)
export const hasChildren = <T extends {}>(value: T): value is HasChildrenProp<T> =>
  'children' in value && isFunction((value as HasChildrenProp<T>).children)
export const isFunction = <T extends {}>(value: T): value is IsFunction<T> =>
  typeof value === 'function'

type Slots = {
  content: ReactNode
}

export const isObject = <T extends object>(value: any): value is T =>
  typeof value === 'object' && typeof value !== 'function' && value != undefined

export const areNamedSlots = <T extends Slots>(children: any): children is T =>
  isObject(children) && 'content' in children
