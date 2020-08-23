import React, { useEffect } from 'react'
import { ProvideSessions } from '@hooks'
import Layout from '../../components/templates/Checkout.tsx' // Remove Checkout.js later to simplify this import
import { isDev } from 'helpers'

const Checkout = () => {

  // We don't want this event occuring on NextJS's refreshing.
  if (!isDev()) {

    useEffect(() => {
      window.addEventListener("beforeunload", (event) => {
        event.preventDefault();
        return (event || window.event).returnValue = 'Are you sure you want to close?';
      });

      return () => {
        window.removeEventListener('beforeunload', null)
      }
    }, [])
  }

  return (
    <ProvideSessions>
      <Layout />
    </ProvideSessions>
  )
}

export default Checkout
