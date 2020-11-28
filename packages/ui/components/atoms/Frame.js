import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'prop-types'

const Frame = ({
    bg = "gray",
    children
}) => {
    return (
        <Box h='100%' bg={bg} p={4}>
            {children}
        </Box>
    )
}

Frame.propTypes = {
    /**
     * The input name of the component
     */
    bg: PropTypes.string
}

export default Frame
