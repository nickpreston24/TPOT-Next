import React, { Component } from 'react'
import Box from '@chakra-ui/core/dist/Box'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'

class HeaderAppDropdown extends Component {

    render() {
        return (
            <Box pl={2} height="100%" display="flex" justifyContent="flex-start" alignItems="center">
                <Avatar alt="Remy Sharp" src="/icon.svg" />
                <Divider orientation="vertical" style={{ background: 'white !important' }} />
                <Box pl={2} fontSize={24} color="white" fontFamily="'Poppins', sans-serif">Scribe</Box>
            </Box>
        )
    }
}

export default HeaderAppDropdown