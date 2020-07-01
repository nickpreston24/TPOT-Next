import React from 'react'
import { Dashboard } from '@components'
import { ZeitCard } from '@components/experimental'
import * as ROUTES from '@constants/routes'
import Template from '../../components/templates/Scribe'

const Edit = () => (
  <Template />
  // // <MobxProvider store={store}>
  // <Dashboard title="TPOT Scribe">
  //   <ZeitCard
  //     url={ROUTES.CHECKOUT}
  //     title="Checkout"
  //     text='Click on "Checkout" at the top to get started!'
  //   />
  //   <ZeitCard
  //     url={ROUTES.LANDING}
  //     title="TPOT"
  //     text='Go Back to Toolbox Home'
  //   />
  // </Dashboard>
  // // </MobxProvider>  
)

export default Edit
