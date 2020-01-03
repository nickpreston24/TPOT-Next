import { Provider } from 'mobx-react'
import App from 'next/app'
import React from 'react'
import { withAuthorization } from '../services/firebase'
import { fetchInitialStoreState, Store } from '../stores/root'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

class MobxApp extends App {
  state = {
    store: new Store(),
  }

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext)
    const initialStoreState = await fetchInitialStoreState()

    return {
      ...appProps,
      initialStoreState,
    }
  }

  // Hydrate serialized state to store
  static getDerivedStateFromProps(props, state) {
    state.store.hydrate(props.initialStoreState)
    return state
  }

  render() {
    let { Component, pageProps } = this.props
    let AuthorizedApp = withAuthorization(Component)
    return (
      <Provider store={this.state.store}>
        <AuthorizedApp {...pageProps} />
        <ToastContainer newestOnTop />
      </Provider >
    )
  }
}
export default MobxApp