import React from 'react'
import { ProvideSessions } from '@hooks'
// import { CheckoutTable, Dashboard } from '@components'
import Layout from '../../components/templates/Checkout.tsx' // Remove Checkout.js later to simplify this import
import { Box } from '@chakra-ui/core'

const Checkout = () => {
  return (
    <ProvideSessions>
      <Layout />
    </ProvideSessions>
    // <Box>Test?</Box>

    // <Dashboard title="TPOT Scribe - Checkout">
    // <CheckoutTable />
    // </Dashboard>
  )
}

export default Checkout
