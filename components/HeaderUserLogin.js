import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import { Avatar, IconButton } from '@material-ui/core'
import { observer, inject } from 'mobx-react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import { withRouter } from 'next/router'

@inject('store')
@observer
@withRouter
class HeaderUserLogin extends Component {

    render() {
        const { store, router } = this.props
        const { signOut } = store
        return (
            <Box pr={2} height="100%" display="flex" justifyContent="flex-end" alignItems="center" color="white">
                <Avatar alt="Remy Sharp" src="http://www.themes-lab.com/conbis/assets/images/avatars/avatar1.png" style={{ height: 32, width: 32 }} />
                <Box pl={2} mr={3} fontSize={18} color="white" fontFamily="'Poppins', sans-serif">Braden</Box>
                <IconButton color="inherit" aria-label="add to shopping cart" onClick={() => router.push('/account')}>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="add to shopping cart" onClick={signOut}>
                    <ExitToAppIcon />
                </IconButton>
            </Box>
        )
    }
}

export default HeaderUserLogin