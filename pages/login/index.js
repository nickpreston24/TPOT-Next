import { Box } from '@material-ui/core'
import React, { Component } from 'react'
import LoginForm from './LoginForm'
import Page from '../../components/Page'

class Login extends Component {

    render() {
        return (
            <Page title="TPOT Toolbox - Login">
                <Box>
                    <LoginForm />
                </Box>
            </Page>
        )
    }

}

export default Login