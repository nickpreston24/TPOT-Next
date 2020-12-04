import { ReactNode } from "react"



/******* Imports (Helpers) *******/

/**
 * Render Props
 * These may be imported or copy/pasted, up to you.
 */

export type HasRenderProp<T> = T extends { render: (props: any) => ReactNode } ? T : never
export type HasChildrenProp<T> = T extends { children: (props: any) => ReactNode } ? T : never
export type IsFunction<T> = T extends (...args: any[]) => any ? T : never

export const hasRender = <T extends {}>(value: T): value is HasRenderProp<T> => 'render' in value && isFunction((value as HasRenderProp<T>).render)
export const hasChildren = <T extends {}>(value: T): value is HasChildrenProp<T> => 'children' in value && isFunction((value as HasChildrenProp<T>).children)
export const isFunction = <T extends {}>(value: T): value is IsFunction<T> => typeof value === 'function'


/**
 * Usages
 */

// export type Props = { onToggle: (on: boolean) => void } & RenderProps  <== Example Props for your class component.

// type RenderProps =                                   // <== Example Props for the render portion of your class component.
//     | { children: (api: API) => ReactNode }
//     | { render: (api: API) => ReactNode }

// type API = ReturnType<MyAwesomeComponent['getApi']> // <== Example of setting up an API type reference and call to inner api provider 'getApi()'.

// const initialState = { on: false }           // <== Setup an initial state for use in your class component.
// type State = Readonly<typeof initialState>   // <== Create a State


/**
 * Slotted Composition
 * These may be imported or copy/pasted, up to you.
 */

type Slots = {
    content: ReactNode
}

export const isObject = <T extends object>(value: any): value is T => typeof value === 'object' && typeof value !== 'function' && value != undefined

// Below is the default usage, but if there are other required props in Slots, then extend this function's children check below:
export const areNamedSlots = <T extends Slots>(children: any): children is T => isObject(children) && 'content' in children

// export const areNamedSlots= <Slots>(children: any): children is Slots => isObject(children) && 'content' in children  // <== copy/paste this sample, if not using the default import.


/**
 * Usages
 */

// type CardSlots = {
//     content: ReactNode
//     header?: ReactNode
//     actions?: ReactNode
//     media?: ReactNode
// }