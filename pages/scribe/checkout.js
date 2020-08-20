import React, { useEffect } from 'react'
import { ProvideSessions } from '@hooks'
import Layout from '../../components/templates/Checkout.tsx' // Remove Checkout.js later to simplify this import

const Checkout = () => {

  useEffect(() => {
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      return (event || window.event).returnValue = 'Are you sure you want to close?';
    });

    return () => {
      window.removeEventListener('beforeunload', null)
    }
  }, [])

  return (
    <ProvideSessions>
      <Layout />
    </ProvideSessions>
  )
}

export default Checkout
