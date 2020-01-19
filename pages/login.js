import { Box } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import LoginForm from '../components/Forms/LoginForm'
import Page from '../components/Page'

@inject('store')
@observer
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