import React from 'react'
import Dashboard from '../../components/Dashboard'
import { ZeitCard } from '../../components/experimental'
import * as ROUTES from '../../constants/routes'

const Edit = () => (
  // <MobxProvider store={store}>
  <Dashboard title="TPOT Scribe">  
    <ZeitCard
      url={ROUTES.CHECKOUT}
      title="Checkout"
      text='Click on "Checkout" at the top to get started!'
    />
    <ZeitCard
      url={ROUTES.LANDING}
      title="TPOT"
      text='Go Back to Toolbox Home'
    />
  </Dashboard>
  // </MobxProvider>  
)

export default Edit
