import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ProvideAuth, ProvideWordpress } from '@hooks'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import customTheme from 'components/utils/Theme'
import muiTheme from 'components/utils/MuiTheme'

const MobxApp = (props) => {

  let { Component, pageProps } = props

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <ProvideWordpress>
          <ProvideAuth>
            <Component {...pageProps} />
            <ToastContainer newestOnTop />
          </ProvideAuth>
        </ProvideWordpress>
      </ThemeProvider>
    </MuiThemeProvider>
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
