import React from 'react'
import App from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider as MobxProvider } from 'mobx-react'
import { withAuthentication } from '../services/session'

import { ProvideAuth } from '../hooks/useAuth'

// import { withAuthentication } from '../services/session'
// import { fetchInitialStoreState, store } from '../stores/Root.ts'
// import DialogProvider from '../hoc/DialogProvider'


const MobxApp = (props) => {

  /* Page Props ver. */

  let { Component, pageProps } = props
  let AuthorizedApp = withAuthentication(Component)
  console.log('pageProps :>> ', pageProps);

  return (
    <ProvideAuth>
      {/* <AuthorizedApp {...pageProps} /> */}
      <Component {...pageProps} />
      <ToastContainer newestOnTop />
    </ProvideAuth>
  )
}

// class MobxApp extends App {

//   componentDidMount = () => console.count('_App init()')

//   // Fetching serialized(JSON) store state
//   // static async getInitialProps(appContext) {
//   //   const appProps = await App.getInitialProps(appContext)
//   //   const initialStoreState = await fetchInitialStoreState()
//   //   console.log('initialStoreState', initialStoreState)
//   //   return {
//   //     ...appProps,
//   //     initialStoreState,
//   //   }
//   // }

//   // Hydrate serialized state to store
//   // static getDerivedStateFromProps(props, state) {
//   //   state.store.hydrate(props.initialStoreState)
//   //   return state
//   // }

//   render() {
//     let { Component, pageProps } = this.props
//     // let AuthorizedApp = withAuthentication(Component)
//     console.log('pageProps :>> ', pageProps);
//     return (
//       <div>
//         {/* <AuthorizedApp {...pageProps} /> */}
//         <Component {...pageProps} />
//         <ToastContainer newestOnTop />
//       </div>
//     )
//   }
// }

export default MobxApp;
// export default withAuthentication(MobxApp)
