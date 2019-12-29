import React, { Component } from 'react'
import Link from 'next/link'
import Dashboard from '../components/Dashboard'

const Home = () => (
  <Dashboard title="TPOT Scribe">
    <h1>Welcome to Scribe</h1>
    <Link href="/scribe/editor"><a>Lets Get Started! </a></Link>
  </Dashboard>
)

export default Home
