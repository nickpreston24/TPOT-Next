import NextLink from 'next/link'
import React from 'react'
import Template from '../../components/templates/Scribe'
import * as ROUTES from '../../constants/routes'

const Page = () => {
  return (
    <Template
      title='Welcome to Scribe'
      subtitle='What would you like to do first?'
      primaryButtonProps={{
        children: CheckoutLink,
        variantColor: 'primary',
        variant: 'solid',
      }}
      secondaryButtonProps={{
        children: EditorLink,
        variantColor: 'primary',
        variant: 'outline',
      }}
    />
  )
}

const CheckoutLink = (
  <NextLink href={ROUTES.CHECKOUT}>
    <a>{'Checkout a paper'}</a>
  </NextLink>
)

const EditorLink = (
  <NextLink href={ROUTES.EDIT}>
    <a>{'Start from scratch'}</a>
  </NextLink>
)

export default Page
