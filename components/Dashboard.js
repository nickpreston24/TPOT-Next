import React, { Component } from 'react'
import Header from './Header'
import { inject, observer } from 'mobx-react'
import Box from '@material-ui/core/Box'
import Page from './Page'

@inject('store')
@observer
class Dashboard extends Component {

  render() {
    const { children, title, details } = this.props
    return (
      <Page title={title}>
        <Box height="100%" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="stretch">
          <Header />
          <Box flexGrow={1} bgcolor="#f8f9fa" display="flex" overflow="hidden">
            <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1} fontSize={24} style={{ overflowY: 'hidden', overflowX: 'hidden' }}>
              {children}
            </Box>
            {details && <Box bgcolor="white" boxShadow={3} p={2} style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
              {details}
            </Box>}
          </Box>
        </Box>
      </Page>
    )
  }
}

export default Dashboard