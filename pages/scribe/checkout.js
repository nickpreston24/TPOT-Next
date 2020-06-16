import React from 'react'
import Link from 'next/link'
import Dashboard from '../../components/Dashboard'
// import { observer } from 'mobx-react'
// import { compose } from 'recompose'
import { CheckoutTable } from '../../components/checkout'
import { Box, Chip } from '@material-ui/core'
import { useAuth } from '@hooks'
import { SessionProvider } from '@contexts/Session'
// import { sessionStore } from '../../stores/SessionStore'

const Checkout = props => {

  const auth = useAuth();
  // console.log('sessions :>> ', sessionStore);

  return (

    <Dashboard title="TPOT Scribe - Checkout">
      <Box width="100%" pt={4} display="flex" justifyContent="center">
        <CheckoutTable />
      </Box>
    </Dashboard>

  )
}

export default Checkout
