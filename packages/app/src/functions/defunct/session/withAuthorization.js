import { observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import { compose } from 'recompose'

const withAuthorization = () => {
  class withAuthorization extends React.Component {
    render() {
      return <div>The router logic has been moved to withAuthentication.js</div>
    }
  }

  return compose(withRouter, observer)(withAuthorization)
}

export default withAuthorization
