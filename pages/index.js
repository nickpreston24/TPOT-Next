import React, { Component } from 'react'
import Dashboard from '../components/Dashboard'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class App extends Component {

  render() {
    const { store } = this.props
    return (
      <Dashboard title="TPOT Toolbox">
        {/* <Redirect href="/scribe" /> */}
      </Dashboard>
    )
  }
}

export default App

