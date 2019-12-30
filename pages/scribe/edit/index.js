import React, { Component } from 'react'
import Link from 'next/link'
import Dashboard from '../../../components/Dashboard'

const Checkout = () => (
  <Dashboard title="TPOT Scribe - Edit">
    <h1>Edit!</h1>
    Load Document from <Link href="/scribe/checkout"><a>Checkout</a></Link>
  </Dashboard>
)

export default Checkout
