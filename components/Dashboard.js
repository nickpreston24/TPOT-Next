import React, { Component } from 'react'
import Header from './Header'
import { inject, observer } from 'mobx-react'
import Box from '@material-ui/core/Box'
import Page from './Page'
import withAuthentication from './withAuthentication'
import { compose } from 'recompose'


// const Dashboard = props => {
//   const { store, children, title, details } = props
//   return (
//     <div >
//       <Header />
//       {children}
//     </div>
//   )
// }

@inject('store')
@observer
class Dashboard extends Component {

  render() {
    const { store, children, title, details } = this.props
    return (
      <Page title={title}>
        <Box height="100%" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="stretch">
          <Header />
          <Box flexGrow={1} fontSize={24} bgcolor="#f8f9fa" display="flex">
            <Box flexGrow={1}>
              {children}
              <button onClick={store.toggle}>{`Toggle ${store.active ? 'A' : 'B'}`}</button>
            </Box>
            {details && <Box width={320} bgcolor="white" boxShadow={3} p={2} style={{boxSizing: 'border-box'}}>
              { details }
            </Box>}
          </Box>
        </Box>
      </Page>
    )
  }
}

// export default compose(
//   withAuthentication,
//   observer
// )(Dashboard)
export default withAuthentication(Dashboard)