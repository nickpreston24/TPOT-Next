import React, { Component, useState, useEffect } from 'react'
import { useRouter, withRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

const withAuthentication = Component => {
    const WithAuthentication = observer(({ store, ...rest }) => {
        const authenticated = store.authenticated
        return (
            <>
                {authenticated && <Component {...{store, ...rest}} />}
                {!authenticated && <Redirect href="/login" /> }
            </>
        )
    })
    return inject('store')(WithAuthentication);
}




    // @inject('store')
    // class WithAuthentication extends React.Component {

    //     componentDidMount() {
    //         !this.props.store.authenticated && Router.push(this.props.href)
    //     }
    //     render() {
    //         const { store, children } = this.props
    //         const { authenticated } = store
    //         return (
    //             <>{authenticated && <Component {...this.props} />}</>
    //         )
    //     }
    // }


export default withAuthentication;

// @inject('store')
// @observer

// class Authenticator extends Component {

//     render() {
//         const { store, children } = this.props
//         const { authenticated } = store
//         return (
//             <>{ authenticated ? { children } : <Redirect href="/login" />}</>
//         )
//     }
// }

// export default Authenticator

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
  }
)