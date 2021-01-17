import Router from 'next/router'
import { AppStore } from '../../stores'
import { Command } from './Command'

export class SwitchAppCommand extends Command {
  store: AppStore
  private destination: string

  public execute(): void {
    this.store.currentApp = this.destination
    Router.push(this.destination)
  }
  public unexecute(): void {
    throw new Error('Method not implemented.')
  }

  constructor(store: AppStore, destination: string) {
    super()
    this.destination = destination
    this.store = store
  }
}
