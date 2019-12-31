import { action, observable, computed } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import { Firebase } from '../services/firebase'
import { Collection } from 'firestorter'

// Determine mode for client or server data serving 

const isServer = typeof window === 'undefined'
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer)


// Main MobX storoe class for app-wide use.

export class Store {

  /////////////////////////
  //   All Observables   //
  /////////////////////////

  @observable authenticated = false
  @observable active = false
  @observable authUser = null

  /////////////////////////
  //    Initialization   //
  /////////////////////////

  constructor() {

    // Firebase() is our collection of funcs using the firebase instance
    // this.firebase is an instance of the initialized 'firebase' module
    this.firebase = Firebase.init()

  }

  hydrate(serializedStore) {
    // For later, such as offline IndexedDB with Localforage
  }

  /////////////////////////
  //      Firebase       //
  /////////////////////////

  @action signIn = async (email, password) => {
    console.log('sign in', email, password)
    Firebase.signIn(email, password)
  }

  @action signOut = () => {
    Firebase.signOut()
  }

  @action setAuthUser = authUser => {
    this.authUser = authUser
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