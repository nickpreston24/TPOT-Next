import React from 'react'
import Link from 'next/link'
import Dashboard from '../components/Dashboard'

const Account = (/*wpService:WpService*/) => (
  <Dashboard title="TPOT Toolbox - Account">
    <h1>Account</h1>
    <Link href="/"><a>{'<-- '}Return to Toolbox</a></Link>

    <div className="wp-section">

      <h1>Papers Posted:</h1>
      <h1>Papers Drafted:</h1>
      
      </div>
  </Dashboard>
)

export default Account
