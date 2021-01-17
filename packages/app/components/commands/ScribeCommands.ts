import Router from 'next/router'
import { CheckoutStatus } from '../../constants'
import { ScribeStore } from '../../stores'
import { Command } from './Command'

export class FreshEditCommand extends Command {
  private activationRoute: string
  private scribeStore: ScribeStore

  constructor(store: ScribeStore, route: string) {
    super()
    this.activationRoute = route
    this.scribeStore = store
  }

  public execute(): void {
    const { setStatus } = this.scribeStore
    setStatus(CheckoutStatus.NotStarted)
    Router.push(this.activationRoute)
  }

  public unexecute(): void {
    throw new Error('Method not implemented.')
  }
}

export class CheckoutCommand extends Command {
  private activationRoute: string
  private scribeStore: ScribeStore

  constructor(store: ScribeStore, route: string) {
    super()
    this.activationRoute = route
    this.scribeStore = store
  }

  public execute(): void {
    this.scribeStore.lastStatus = this.scribeStore.currentStatus
    this.scribeStore.currentStatus = CheckoutStatus.CheckedOut
    Router.push(this.activationRoute)
  }

  public unexecute(): void {
    throw new Error('Method not implemented.')
  }
}
