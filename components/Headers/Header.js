import React from 'react'
import Box from '@material-ui/core/Box'
import HeaderTabs from './HeaderTabs'
import HeaderAppDropdown from './HeaderAppDropdown'
import HeaderUserLogin from '../HeaderUserLogin'

// #2d374a

const Header = () => (
    <Box display="flex" bgcolor="#21304a" color="primary.main" height={70}>
        <Box width={300}>
            <HeaderAppDropdown />
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
            <HeaderTabs />
        </Box>
        <Box width={300}>
            <HeaderUserLogin />
        </Box>
    </Box>
)

export default Header;
