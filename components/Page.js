import React from 'react'
import Head from 'next/head'
import { observer } from 'mobx-react'
import { compose } from 'recompose'
import { Box } from '@material-ui/core'

// : This component ensures that we always have a full height and width container for each page

const Page = compose(
  observer
)(
  ({ children, title }) =>
    <div>
      <Head>
        <title>{ title }</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link href="https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

      <style global jsx>{`
        body {
          margin: 0px;
          border: none;
          background: #f8f9fa;
        }
      `}</style>
      
      <Box width="100vw" height="100vh" position="absolute" overflow="hidden">
        { children }
      </Box>
      
    </div>
)

export default Page