import React, { Component } from 'react'
import Link from 'next/link'
import Dashboard from '../components/Dashboard'

const Account = () => (
  <Dashboard title="TPOT Scribe">
    <h1>Account</h1>
    <Link href="/scribe/editor"><a>{`<-- `}Return to Editor</a></Link>
  </Dashboard>
)

export default Account
