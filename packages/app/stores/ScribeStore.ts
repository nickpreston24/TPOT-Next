import { action, observable } from 'mobx'
import { CheckoutStatus } from '../constants/CheckoutStatus'

export class ScribeStore {
  static instance = null
  static getInstance() {
    if (!ScribeStore.instance) ScribeStore.instance = new ScribeStore()

    return this.instance
  }

  @observable lastStatus: CheckoutStatus = CheckoutStatus.NotStarted
  @observable currentStatus: CheckoutStatus = CheckoutStatus.NotStarted

  @action setStatus = (status: CheckoutStatus) => {
    this.lastStatus = this.currentStatus
    this.currentStatus = status
  }
}

export const scribeStore = ScribeStore.getInstance()
