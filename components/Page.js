import React, { Component } from 'react'
import Head from 'next/head'
import Header from './Header'
import Box from '@material-ui/core/Box'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class Page extends Component {

  render() {
    const { store } = this.props
    return (
      <div>
        <Head>
          <title>TPOT Scribe</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
    
        <style global jsx>{`
          body {
            margin: 0px;
            border: none;
            display: flex;
          }
        `}</style>
        
        <Box width="100%" height="100%" position="absolute" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="stretch">
          <Header />
        <Box flexGrow={1} fontSize={24}>App Content
          <button onClick={store.toggle}>{`${store.active}`}</button>
          {this.props.children}
        </Box>
        </Box>
    
        {/* <Box id="frame" minHeight="100%" idth="100%" m={0} p={0} border={1}>Welcome to Next.js!</Box> */}
        
      </div>
    )
  }
}

export default Page