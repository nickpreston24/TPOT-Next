import React, { Component } from 'react'
import Link from 'next/link'

import { useRouter } from 'next/router'
import Dashboard from '../../../components/Dashboard'

const Post = () => {
  const router = useRouter()
  const { doc } = router.query

  return (
    <Dashboard title={`TPOT Scribe - Edit - ${doc}`}
      details={
        <p>test</p>
      }
    >
      <p>DocID: {doc}</p>
    </Dashboard>
  )
}

export default Post
