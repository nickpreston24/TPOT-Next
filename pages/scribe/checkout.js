import React from 'react'
import { ProvideSessions } from '@hooks'
import Layout from '../../components/templates/Checkout.tsx' // Remove Checkout.js later to simplify this import

const Checkout = () => {
  return (
    <ProvideSessions>
      <Layout />
    </ProvideSessions>
  )
}

export default Checkout
