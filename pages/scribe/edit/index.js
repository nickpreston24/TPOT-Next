import React, { useEffect } from 'react'
import Template from '@templates/PaperEditor'
import { isDev } from 'helpers'

const Page = () => {

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
    <Template />
  )
}

export default Page
