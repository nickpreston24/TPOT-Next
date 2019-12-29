import React, { Component } from 'react'
import Link from 'next/link'
import Dashboard from '../components/Dashboard'

const Home = () => (
  <Dashboard title="TPOT Scribe">
    <h1>Welcome</h1>
    <Link href="/editor"><a>To Editor</a></Link>
  </Dashboard>
)

export default Home
