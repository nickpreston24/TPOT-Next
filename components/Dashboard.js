import React, { Component } from 'react'
import { Header } from './header'
import { Box } from '@chakra-ui/core'
import Page from './Page'

export class Dashboard extends Component {

  render() {
    const { children, title, details } = this.props

    return (
      <Page title={title}>
        <Box
          // border="3px solid lime"
          height="100%" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="stretch"
        >
          <Header />
          <Box
            // border="3px dotted pink"
            height="70%" flexGrow={1} display="block" boxSizing="border-box">
            {children}
          </Box>

          {/* A 'footer', if we need;  doubt it - MP */}
          {/* <Box
            height="30%"
            border="3px dotted red"
            display="block" boxSizing="border-box" position="relative">
          
          </Box> */}

        </Box>
      </Page>
    )
  }
}

export default Dashboard