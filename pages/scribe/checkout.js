import React from 'react'
import Link from 'next/link'
import Dashboard from '../../components/Dashboard'
// import { observer } from 'mobx-react'
// import { compose } from 'recompose'
import { CheckoutTable } from '../../components/checkout'
import { Box, Chip } from '@material-ui/core'
import { useAuth } from '@hooks'
import { tableState } from '@components/checkout/TableState'

const Checkout = props => {
  
  const auth = useAuth();

  const { sessions } = tableState

  console.log('sessions :>> ', sessions);
  return (

    <Dashboard title="TPOT Scribe - Checkout">
      <div>
        <Box width="100%" pt={4} display="flex" justifyContent="center">
          <CheckoutTable {...{ sessions }} />
        </Box>
      </div>
    </Dashboard>

  )
}

export default Checkout
