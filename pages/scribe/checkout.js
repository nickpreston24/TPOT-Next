import React from 'react'
import Link from 'next/link'
import Dashboard from '../../components/Dashboard'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { CheckoutTable } from '../../components/CheckoutTable'
import { Box, Chip } from '@material-ui/core'

const Checkout = props => {
  const { store } = props
  const { sessions } = store
  return (
    <Dashboard title="TPOT Scribe - Checkout">
      <Box width="100%" pt={4} display="flex" justifyContent="center">
        <CheckoutTable {...{ sessions }} />
      </Box>
    </Dashboard>
  )
}

export default Checkout
