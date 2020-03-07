import React, { Component } from 'react'
import Dashboard from '../components/Dashboard'
import { inject, observer } from 'mobx-react'
import Editor from '../components/Editor'

// TODO: A way to compose functional components?
// export const A = compose(
//   inject('store'),
//   observer)(
//     function B() {
//       return (<div>Hello</div>)
//     }
//   )

@inject('store')
@observer
class App extends Component {

  render() {
    const { store } = this.props
    console.log('main store', store);
    return (
      <Dashboard title="TPOT Toolbox">
        Click on "Checkout" at the top to get started!
        {/* <Redirect href="/scribe/checkout" /> */}
      </Dashboard>
    )
  }
}

export default App

