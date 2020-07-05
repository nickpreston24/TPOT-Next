import React from 'react'
import { Box } from '@chakra-ui/core'
import { Avatar, IconButton } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import Router from 'next/router'
import { useAuth } from '@hooks'
import * as ROUTES from '@routes'

const HeaderUserLogin = props => {

    const auth = useAuth();
    const { signout } = auth;
    return (
        <Box pr={2} height="100%" display="flex" justifyContent="flex-end" alignItems="center" color="white">
            <Avatar alt="Remy Sharp" src="http://www.themes-lab.com/conbis/assets/images/avatars/avatar1.png" style={{
                height: 32,
                width: 32
            }} />
            <Box pl={2} mr={3} fontSize={18} color="white" fontFamily="'Poppins', sans-serif">Braden</Box>
            <IconButton color="inherit" aria-label="add to shopping cart" onClick={() => signout().then(() => Router.push(ROUTES.LANDING))}>
                <SettingsOutlinedIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="exit" onClick={async () => {
                await signout()
                Router.push(ROUTES.LANDING)
            }}>
                <ExitToAppIcon />
            </IconButton>
        </Box>
    );
};

export default HeaderUserLogin