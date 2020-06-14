import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import { Avatar, Divider } from '@material-ui/core'
// import { inject, observer } from 'mobx-react'

// @inject('store')
// @observer
class HeaderAppDropdown extends Component {

    render() {
        return (
            <Box pl={2} height="100%" display="flex" justifyContent="flex-start" alignItems="center">
                <Avatar alt="Remy Sharp" src="/icon.svg" />
                <Divider orientation="vertical" style={{background: 'white !important'}} />
                <Box pl={2} fontSize={24} color="white" fontFamily="'Poppins', sans-serif">Scribe</Box>
            </Box>
        )
    }
}

export default HeaderAppDropdown