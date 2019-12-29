import { action, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react'

const isServer = typeof window === 'undefined'
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer)

export class Store {
  @observable lastUpdate = 0
  @observable light = false
  @observable active = false

  hydrate(serializedStore) {
  // For later, such as offline IndexedDB with Localforage
  }

  @action start = () => {
    this.timer = setInterval(() => {
      this.lastUpdate = Date.now()
      this.light = true
    }, 1000)
  }

  @action toggle = () => {
      this.active = !this.active
  }

  stop = () => clearInterval(this.timer)
}

export async function fetchInitialStoreState() {
  // You can do anything to fetch initial store state
  return {}
}