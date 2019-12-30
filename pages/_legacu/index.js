import React, { Component } from 'react'
import Link from 'next/link'
import Dashboard from '../../../components/Dashboard'

const Checkout = () => (
  <Dashboard title="TPOT Scribe - Edit">
    <h1>Editor</h1>
    <p>Get Started with a Paper from <Link href="/scribe/checkout"><a>Checkout</a></Link></p>
  </Dashboard>
)

export default Checkout
