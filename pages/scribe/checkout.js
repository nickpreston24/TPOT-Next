import React from 'react'
import Link from 'next/link'
import Dashboard from '../../components/Dashboard'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { CheckoutTable } from '../../components/CheckoutTable'
import { Box, Chip } from '@material-ui/core';


const Checkout = props => {
  const { store } = props
  const { sessions } = store
  return (
    <Dashboard title="TPOT Scribe - Checkout">
      <Box width="100%" pt={4} display="flex" justifyContent="center">
        <CheckoutTable {...{ sessions }} />
      </Box>
      {/* <h1>Checkout</h1>
      <Link
        href={"/scribe/edit/[doc]"}
        as={`/scribe/edit/${'cEHUmSdrzp8v9BxLFuvO'}`}
      >
        <a>Load Example Document 'cEHUmSdrzp8v9BxLFuvO'</a>
      </Link>
      {sessions && sessions.docs.map((session, idx) => {
        const { id } = session
        return (
          <Link
            href={"/scribe/edit/[doc]"}
            as={`/scribe/edit/${id}`}
            key={id}
          >
            <a><p>{id}</p></a>
          </Link>
        )
      })} */}
    </Dashboard>
  )
}

export default compose(
  inject('store'),
  observer
)(Checkout)
