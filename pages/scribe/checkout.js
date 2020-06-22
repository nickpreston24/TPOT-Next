import React from 'react'
import { useAuth, ProvideSessions } from '@hooks'
// import { CheckoutTable } from '../components/checkout'
// import { Dashboard } from './components'
import { CheckoutTable, Dashboard } from '@components'
import { Row } from 'simple-flexbox'
// import Link from 'next/link'
// import { Box, Chip } from '@material-ui/core'

const Checkout = () => {

  // const auth = useAuth();
  // console.log('sessions :>> ', sessionStore);  

  console.log('ProvideSessions :>> ', ProvideSessions);

  console.log('CheckoutTable :>> ', CheckoutTable, Dashboard);

  return (
    <Dashboard title="TPOT Scribe - Checkout">
      <CheckoutTable />
      {/* <Box width="100%" pt={4} display="flex" justifyContent="center"> */}
      {/* <Row aligncontents='center' > */}
      {/* <ProvideSessions>
      </ProvideSessions> */}
      {/* </Row> */}
      {/* </Box> */}
    </Dashboard>
  )
}

export default Checkout
