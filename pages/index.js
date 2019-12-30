import React, { Component } from 'react'
import Link from 'next/link'
import Dashboard from '../components/Dashboard'
import { Router, withRouter } from 'next/router'
import withAuthentication from '../components/withAuthentication'

const Toolbox = () => {
  return (
    <Dashboard title="TPOT Toolbox">
      <h1>Toolbox</h1>
      <Link href="/scribe"><a>Go to Scribe{`-->`}</a></Link>
      <Redirect href="/scribe" />
    </Dashboard>
  )
}

export default withAuthentication(Toolbox)







const Redirect = withRouter((props) => {
  class Redirect extends Component {
    componentDidMount() {
      const { router, href } = this.props
      router.push(href)
    }
    render() {
      return <></>
    }
  }
  return <Redirect {...props} />
}
)




