import { Box } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import Page from '../components/Page'
import withAuthentication from '../components/withAuthentication'


@inject('store')
@observer
class Login extends Component {
    render() {
        const { store } = this.props
        const { signIn, signOut } = store
        return (
            <Page title="TPOT Toolbox - Login">
                <Box>
                    <LoginForm />
                </Box>
            </Page>
        )
    }
}

export default withAuthentication(Login)


// @inject('store')
// @observer
// class LoginPopup extends Component {
//     render() {
//         const { store } = this.props
//         const { signIn, signOut } = store
//         return (
//             <Page title="TPOT Toolbox - Login">
//                 <Box>
//                     <p><b>User:</b> John Doe</p>
//                     <p><b>Password:</b> **********</p>
//                     <Button variant="contained" onClick={() => signIn(firebaseCreds.email, firebaseCreds.password)}>Sign In</Button>
//                     <Button variant="contained" onClick={signOut}>Sign Out</Button>
//                 </Box>
//             </Page>
//         )
//     }
// }
