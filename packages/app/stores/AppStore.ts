import { observable } from 'mobx'

export class AppStore {
  static instance = null

  static getInstance() {
    if (!AppStore.instance) AppStore.instance = new AppStore()

    return this.instance
  }
  @observable currentApp: string = 'Scribe'
}

export const appStore = AppStore.getInstance()
