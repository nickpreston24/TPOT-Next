import React from 'react'
import { ProvideSessions } from '@hooks'
<<<<<<< HEAD
import { CheckoutTable, Layout } from '@components'

const Checkout = () => {
  return (
    <Layout title="TPOT Scribe - Checkout">
      <ProvideSessions>
        <CheckoutTable />
      </ProvideSessions>
    </Layout>
=======
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
>>>>>>> ec08a0962c726c070e9f59b39dd167f7b13f8d4b
  )
}

export default Checkout
