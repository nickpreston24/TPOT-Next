import { FC, ReactChild, ReactNode } from 'react'

export type ListProps<T> = { entries: T[]; title?: string }

export type Props = {
  children: Slots | ReactChild
}

type Slots = {
  list: ReactNode
  paint: ReactNode
  entries: any[]
}

const isObject = <T extends object>(value: any): value is T =>
  typeof value === 'object' && typeof value !== 'function' && value != undefined
const areNamedSlots = (children: any): children is Slots =>
  isObject(children) && 'entries' in children && 'list' in children && 'paint' in children

export const Docket: FC<Props> = (props) => {
  const { children } = props

  if (!children) throw new Error('Children are required for this component.')

  if (areNamedSlots(children)) {
    const { entries, list, paint } = children

    const Records = entries.map((entry) => {
      return (
        <div className='docket'>
          {paint ? <div className='docket-paint'>{paint}</div> : <li>{entry}</li>}
        </div>
      )
    })

    return list ? (
      <div className='docket-list'>{Records}</div>
    ) : (
      <ul className='docket-ul'>{Records}</ul>
    )
  } else return <div className='section'>{children}</div>
}

export default Docket
