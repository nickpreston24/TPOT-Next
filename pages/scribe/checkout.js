import React from 'react'
import { ProvideSessions } from '@hooks'
import { CheckoutTable, Layout } from '@components'

const Checkout = () => {
  return (
    <Layout title="TPOT Scribe - Checkout">
      <ProvideSessions>
        <CheckoutTable />
      </ProvideSessions>
    </Layout>
  )
}

export default Checkout
