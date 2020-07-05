import React, { Component } from 'react'
import Dashboard from '@components/Dashboard'
import ZeitCard from '@components/experimental/ZeitCard'
import * as ROUTES from '@constants/routes'
import { MyEditor } from 'tpot-scribe-editor'
import { disableMe } from 'components/disableMe'


const NewEdit = () => (

  <Dashboard
    title={`TPOT Scribe - New`}
  >

    <MyEditor />

    {/* <ZeitCard
      url={ROUTES.CHECKOUT}
      title="Checkout"
      text="Load Document from Checkout"
      //style={disableMe(true)}
    /> */}
  </Dashboard>
)

export default NewEdit
