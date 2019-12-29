import React, { Component } from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import { Box, Button } from '@material-ui/core'

@inject('store')
@observer
class Login extends Component {
    render() {
        const { store } = this.props
        const { signIn } = store
        return (
            <Box>
                <p><b>User:</b> John Doe</p>
                <p><b>Password:</b> **********</p>
                <Button variant="contained" onClick={signIn}>Sign In</Button>
            </Box>
        )
    }
}

export default Login
