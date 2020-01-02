import { action, observable, computed } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import Firebase from '../services/firebase'
import { Collection } from 'firestorter'

// This needs to go before this root store has time to be populated by a provider
// Firebase.init()

// Determine mode for client or server data serving 
const isServer = typeof window === 'undefined'
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer)

// Main MobX store class for app-wide use.

export class Store {

  /////////////////////////
  //    Initialization   //
  /////////////////////////

  constructor() {
    this.fb = new Firebase()
  }

  hydrate(serializedStore) {
    // For later, such as offline IndexedDB with Localforage
    let entries = Object.keys(serializedStore)
    entries.forEach((entry) =>
      this[entry] = serializedStore[entry]
    )
    // console.log(Object.keys(serializedStore))
    // this.authUser = serializedStore.authUser
  }

  /////////////////////////
  //      Firebase       //
  /////////////////////////

  @observable authUser = this.fb.authUser
  @observable router = this.fb.router

  @action signIn = async userInfo => {
    const { email, password } = userInfo
    this.fb.signIn(email, password)
      .then(user => console.warn('Logged in User'))
      .catch(error => console.error(error.message))
  }

  @action signOut = () => {
    this.fb.signOut()
  }

  @action forgot = userInfo => {
    const { email } = userInfo
    this.fb.forgot(email)
  }

  @action register = userInfo => {
    const { first, last, email, password } = userInfo
    this.fb.register(first, last, email, password)
      .then(user => console.warn('Registered User'))
      .catch(error => console.error(error.message))
  }

  @action getTime = () => {
    return this.fb.getTime()
  }

  /////////////////////////
  //      Checkout       //
  /////////////////////////

  @computed get sessions() {
    let sessions = null
    try {
      sessions = new Collection('sessions')
    } catch (error) {
      // You are not authenticated

    }
    return sessions
  }

}

// Required for NextJS override even if empty

export async function fetchInitialStoreState() {
  // You can do anything to fetch initial store state
  return {}
}