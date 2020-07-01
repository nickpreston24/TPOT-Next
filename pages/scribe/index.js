import React from 'react'
// import { Dashboard } from '@components'
// import { ZeitCard } from '@components/experimental'
import Template from '../../components/templates/Scribe'
import * as ROUTES from '@constants/routes'

const Page = () => {

  return (
    <Template
      title="Welcome to Scribe!"
      subtitle="What would you like to do first?"
      primaryButtonProps={{
        onClick: () => alert('checkout'),
        children: 'Checkout a paper',
        variant: 'filled',
        color: 'white',
        bg: '#6C63FF'
      }}
      secondaryButtonProps={{
        onClick: () => alert('new paper'),
        children: 'Start from scratch',
        variant: 'outline',
        color: '#6C63FF'
      }}
    />
  )
}

export default Page
