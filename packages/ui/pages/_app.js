import { StoreProvider, store } from '@models/RootModel'

import App from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Overlay from '@components/utils/Overlay'
import React from 'react'
import { layout as fullpageLayout } from '@layouts/FullpageLayout'

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props

    const layout = Component.layout || fullpageLayout

    const Page = <Component {...pageProps} />

    const App = layout(Page)

    return (
      <StoreProvider value={store}>
        <ChakraProvider>
          {App}
          <Overlay />
        </ChakraProvider>
      </StoreProvider>
    )
  }
}

export default MyApp
