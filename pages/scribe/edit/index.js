import React, { Component } from 'react'
import Dashboard from '@components/Dashboard'
import ZeitCard from '@components/experimental/ZeitCard'
import * as ROUTES from '@constants/routes'

const Checkout = () => (
  <Dashboard title="TPOT Scribe - Edit">
    <ZeitCard
      url={ROUTES.CHECKOUT}
      title="Checkout"
      text="Load Document from Checkout"
    />
  </Dashboard>
)

export default Checkout
