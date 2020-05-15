import React from 'react'
import Link from 'next/link'
import Dashboard from '../components/Dashboard'

const Account = () => (
  <Dashboard title="TPOT Toolbox - Account">
    <h1>Account</h1>
    <Link href="/"><a>{'<-- '}Return to Toolbox</a></Link>
  </Dashboard>
)

export default Account
