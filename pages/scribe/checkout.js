import React from 'react'
import { ProvideSessions } from '@hooks'
import { CheckoutTable, Dashboard } from '@components'

const Checkout = () => {
  return (
    <Dashboard title="TPOT Scribe - Checkout">
      <ProvideSessions>
        <CheckoutTable />
      </ProvideSessions>
    </Dashboard>
  )
}

export default Checkout
