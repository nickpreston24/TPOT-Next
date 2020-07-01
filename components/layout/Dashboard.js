import React from 'react'
import { Box } from '@chakra-ui/core'

const Layout = ({children}) => {

    return (
        <Box p={8} position="absolute" height="100%" width="100%">
            {children}
        </Box>
    )
}

export default Layout