import { action, observable, computed, autorun } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import Firebase from '../services/firebase'
import { toast } from 'react-toastify';
import { Collection } from 'firestorter'
import { confirmSignout } from '../components/DialogMessages';

// This needs to go before this root store has time to be populated by a provider
// Firebase.init()

// Determine mode for client or server data serving 
const isServer = typeof window === 'undefined'
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer)

// Main MobX store class for app-wide use.

export class Store {


  /////////////////////////
  //   Initialization    //
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

  @action setKey = (key, value) => {
    this[key] = value
  }

  /////////////////////////
  //      Firebase       //
  /////////////////////////

  @observable authUser = this.fb.authUser
  @observable router = this.fb.router

  @action signIn = async userInfo => {
    const { email, password } = userInfo
    this.fb.signIn(email, password)
      .then(user => this.notify('Welcome, Enjoy your stay!', 'success'))
      .catch(error => this.notify(error.message, 'error'))
  }

  @action signOut = () => {
    this.dialog.confirm(confirmSignout)
      .then(() => {
        this.fb.signOut()
        this.notify('You are logged out', 'info')
      })
      .catch(() => null)
  }

  @action forgot = userInfo => {
    const { email } = userInfo
    this.fb.forgot(email)
    this.notify('Success! Check your email', 'info')
  }

  @action register = userInfo => {
    const { first, last, email, password } = userInfo
    this.fb.register(first, last, email, password)
      .then(user => {
        this.notify('Registration Successful!', 'success')
        this.notify('Admin approval needed before you can login')
      })
      .catch(error => this.notify(error.message, 'error'))
  }

  @action getTime = () => {
    return this.fb.getTime()
  }

  /////////////////////////
  //    Notifications    //
  /////////////////////////

  @action callNotify = () => {
    this.notify("Wow so easy !")
  }

  @action notify = (msg, mode) => {
    let toaster = !!mode ? toast[mode] : toast
    toaster(msg, {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  /////////////////////////
  //       Dialogs       //
  /////////////////////////

  @observable dialogPortal = null
  @observable currentPrompt = null

  // @action prompt = (type, cb) => {
  //   this.currentPrompt = {
  //     type,
  //     resolve: cb.resolve,
  //     reject: cb.reject
  //   }
  // }

  /////////////////////////
  //       Routing       //
  /////////////////////////



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