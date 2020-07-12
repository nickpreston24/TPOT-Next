import React, { Component } from 'react'
import { Header } from './header'
import { Box } from '@chakra-ui/core'
import Page from './Page'

export class Dashboard extends Component {

  render() {
    const { children, title, details } = this.props

    return (
      <Page title={title}>
        <Box display="flex" height="100%" boxSizing="border-box" flexDirection="column" overflowX="hidden" overflowY="hidden"
        // height="100%" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="stretch"
        >
          <Header />
          <Box height="100%" flexGrow={1} display="block" boxSizing="border-box">

            <Box display="block" boxSizing="border-box" position="relative">
              {children}
            </Box>
            {/* <Box display="block" boxSizing="border-box" position="relative" bg="grey" height="100%"  overflowY="scroll" overflowX="hidden" >
                
            </Box>
             */}
          </Box>
        </Box>
      </Page>
    )
  }
}

export default Dashboard