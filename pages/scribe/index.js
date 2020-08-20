import React, { useEffect } from 'react'
import NextLink from 'next/link'
import Template from '@templates/Scribe'
import * as ROUTES from '@constants/routes'

const Page = () => {

  const CheckoutLink = <NextLink href={ROUTES.CHECKOUT}><a>{'Checkout a paper'}</a></NextLink>
  const EditorLink = <NextLink href={ROUTES.EDIT}><a>{'Start from scratch'}</a></NextLink>

  return (
    <Template
      title="Welcome to Scribe"
      subtitle="What would you like to do first?"
      primaryButtonProps={{
        children: CheckoutLink,
        variantColor: 'primary',
        variant: 'solid'
      }}
      secondaryButtonProps={{
        children: EditorLink,
        variantColor: 'primary',
        variant: 'outline'
      }}
    />
  )
}

export default Page
