import React from 'react'
import { auth } from '../firebase'
import { AuthUserContext } from '../firebase/AuthUserContext'

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)
      this.state = { authUser: null }
    }

    componentDidMount() {
      this.listener = auth.onAuthStateChanged((authUser) => {
        authUser ? this.setState({ authUser }) : this.setState({ authUser: null })
      })
    }

    componentWillUnmount() {
      if (!!this.listener) this.listener()
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return WithAuthentication
}

export default withAuthentication
