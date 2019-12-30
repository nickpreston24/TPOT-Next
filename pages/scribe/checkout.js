import React, { Component } from 'react'
import Link from 'next/link'
import Dashboard from '../../components/Dashboard'

const Checkout = () => (
  <Dashboard title="TPOT Scribe - Checkout">
    <h1>Checkout</h1>
    <Link 
      href={"/scribe/edit/[doc]"} 
      as={`/scribe/edit/${'cEHUmSdrzp8v9BxLFuvO'}`}
      >
        <a>Load Document 'cEHUmSdrzp8v9BxLFuvO'</a>
      </Link>
  </Dashboard>
)

export default Checkout
