import React, { Component } from 'react'
import Dashboard from '../components/Dashboard'
import { inject, observer } from 'mobx-react'
import Editor from '../components/Editor'

@inject('store')
@observer
class App extends Component {

  render() {
    const { store } = this.props
    return (
      <Dashboard title="TPOT Toolbox">
        <Editor />
        {/* <Redirect href="/scribe" /> */}
      </Dashboard>
    )
  }
}

export default App

