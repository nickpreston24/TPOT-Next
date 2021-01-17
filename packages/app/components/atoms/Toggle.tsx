import { Component, ReactNode } from 'react'
import { hasChildren, hasRender } from '../utils/composition'

export type Props = { onToggle: (on: boolean) => void } & RenderProps
type RenderProps = { children: (api: API) => ReactNode } | { render: (api: API) => ReactNode }

export const initialState = { on: false }
export type State = Readonly<typeof initialState>
type API = ReturnType<Toggle['getApi']>

export class Toggle extends Component<Props, State> {
  readonly state = initialState

  private toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    )

  private getApi() {
    return {
      on: this.state.on,
      toggle: this.toggle,
    }
  }

  render() {
    const { children } = this.props

    if (hasRender(this.props)) {
      return this.props.render(this.getApi())
    }

    if (hasChildren(this.props)) {
      return this.props.children(this.getApi())
    }

    throw new Error('One of children or render props is mandatory and needs to be a function!')
  }
}
