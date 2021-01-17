import CSSReset from '@chakra-ui/core/dist/CSSReset'
import ThemeProvider from '@chakra-ui/core/dist/ThemeProvider'
import { ProvideAuth, ProvideWordpress } from '@hooks'
import * as ROUTES from '@routes'
import { useRouter } from 'next/router'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import customTheme from '../components/utils/Theme'

const MobxApp = (props) => {
  let { Component, pageProps } = props
  const router = useRouter()

  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <ProvideWordpress>
        <ProvideAuth
          handleAuthFailure={() => {
            router.push(ROUTES.LOGIN)
          }}
        >
          <Component {...pageProps} />
          <ToastContainer newestOnTop />
        </ProvideAuth>
      </ProvideWordpress>
    </ThemeProvider>
  )
}

export default MobxApp
