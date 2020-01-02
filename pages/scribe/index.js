import React from 'react'
import Link from 'next/link'
import Dashboard from '../../components/Dashboard'

const Edit = () => (
  <Dashboard title="TPOT Scribe">
    <h1>Welcome to Scribe</h1>
    <Link href="/scribe/edit"><a>Lets Get Started!{` -->`}</a></Link>
  </Dashboard>
)

export default Edit
