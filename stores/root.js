import { action, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import Router from 'next/router'

const isServer = typeof window === 'undefined'
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer)

export class Store {
  @observable authenticated = false
  @observable active = false

  hydrate(serializedStore) {
  // For later, such as offline IndexedDB with Localforage
  }

  @action toggle = () => {
      this.active = !this.active
  }

  @action signIn = () => {
    this.authenticated = true
    this.authenticated && Router.push('/')
  }

  @action signOut = () => {
    this.authenticated = false
    !this.authenticated && Router.push('/login')
  }

}

export async function fetchInitialStoreState() {
  // You can do anything to fetch initial store state
  return {}
}