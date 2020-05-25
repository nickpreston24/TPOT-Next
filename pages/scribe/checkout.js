import React from 'react'
import Link from 'next/link'
import Dashboard from '../../components/Dashboard'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { CheckoutTable } from '../../components/checkout'
import { Box, Chip } from '@material-ui/core'

const Checkout = props => {
  const { store } = props
  console.log('store :>> ', store);
  const { sessions } = store
  return (
      
        <Dashboard title="TPOT Scribe - Checkout">
        <div>
          {/* <h1>The candy man can</h1> */}
            <Box width="100%" pt={4} display="flex" justifyContent="center">
              <CheckoutTable {...{ sessions }} />
            </Box>
        </div>
        </Dashboard>
      
  )
}

export default Checkout
