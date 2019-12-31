import React from 'react'
import Link from 'next/link'
import Dashboard from '../../components/Dashboard'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

const Checkout = props => {
  const { store } = props
  const { sessions } = store
  return (
    <Dashboard title="TPOT Scribe - Checkout">
      <h1>Checkout</h1>
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
            href={"/scribe/edit/${id}"}
            as={`/scribe/edit/${id}`}
            key={id}
          >
            <a><p>{id}</p></a>
          </Link>
        )
      })}
    </Dashboard>
  )
}

export default compose(
  inject('store'),
  observer
)(Checkout)
