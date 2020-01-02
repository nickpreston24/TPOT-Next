import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose'
import { withRouter } from 'next/router'

const withAuthorization = Component => {
  class withAuthorization extends React.Component {

    componentDidMount() {
      this.props.store.fb.setRouter(this.props.router)
    }

    render() {
      const { store } = this.props
      const authUser = store.fb.authUser
      const router = store.fb.router
      const pathname = router ? router.pathname : '/'
      const isLogin = pathname == '/login' || false
      return isLogin
        ? <Component {...this.props} />
        : authUser
          ? <Component {...this.props} {...{ authUser }} />
          : <h1 {...this.props}>Loading...</h1>
    }
  }
  
  return compose(
    inject('store'),
    withRouter,
    observer
  )(withAuthorization)
}

export default withAuthorization

