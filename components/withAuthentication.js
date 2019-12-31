import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

const withAuthentication = Component => {
  @inject('store')
  @observer
  class WithAuthentication extends React.Component {

    componentDidMount() {
      this.listener = this.props.store.fb.firebase.app().auth().onAuthStateChanged(
        authUser => {
          this.props.store.setAuthUser(authUser)
          if (authUser == null) {
            this.props.router.push('/login') // If firebase session times out, it needs to forcefully redirect
          } else {
            this.props.router.push('/')
          }
        }
      );
    }

    render() {
      const { router, store } = this.props
      const { authUser } = store
      const atLogin = router.pathname == '/login'
      if (atLogin) {
        return <Component {...this.props} />
      } else {
        return (
          <>
            {authUser && <Component {...this.props} />}
            {!authUser && <Redirect href="/login" />}
          </>
        )
      }
    }
  }

  return withRouter(WithAuthentication)
}

export default withAuthentication



// Needed incase router.push() doesn't work and the authUser is now null
const Redirect = withRouter(( props ) => {
  class Redirect extends Component {
    componentDidMount() {
      const { router, href } = this.props
      router.push(href)
    }
    render() {
      return <></>
    }
  }
  return <Redirect {...props}/>
})