import React, { Component } from 'react'
import Link from 'next/link'
import Dashboard from '../../components/Dashboard'

const Other = () => (
  <Dashboard title="TPOT Scribe - Edit" panel>
    <h1>Editor</h1>
    <Link href="/"><a>Back Home</a></Link>
  </Dashboard>
)

export default Other
