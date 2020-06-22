import React from 'react'
import Link from 'next/link'
import Dashboard from '../../components/Dashboard'
// import { observer } from 'mobx-react'
// import { compose } from 'recompose'
import { Box, Chip } from '@material-ui/core'
import { useAuth, ProvideSessions } from '@hooks'
import { CheckoutTable } from '../../components/checkout'
// import { SessionProvider } from '@contexts/Session'
import { Row } from 'simple-flexbox'

const Checkout = () => {

  // const auth = useAuth();
  // console.log('sessions :>> ', sessionStore);  

  return (
    <Dashboard title="TPOT Scribe - Checkout">
      {/* <Box width="100%" pt={4} display="flex" justifyContent="center"> */}
      <Row aligncontents='center' >
        <ProvideSessions>
          <CheckoutTable />
        </ProvideSessions>
      </Row>
      {/* </Box> */}
    </Dashboard>
  )
}

export default Checkout
