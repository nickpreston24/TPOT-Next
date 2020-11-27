import { Box } from "@chakra-ui/react"
import React from 'react'

const Details = () => {
    return <Box color='green.500'>Hello!</Box>
}

Details.propTypes = {
    /**
     * The input name of the component
     */
    name: PropTypes.string.isRequired,
}

Details.defaultProps = {
    name: 'Name',
}

export default Details
