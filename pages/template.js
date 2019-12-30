import React, { Component } from 'react'
import Link from 'next/link'

const Account = () => (
  <div title="TPOT Scribe">
    <h1>Account</h1>
    <Link href="/scribe/editor"><a>{`<-- `}Return to Editor</a></Link>
  </div>
)

export default Account
