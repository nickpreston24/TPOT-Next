import React from 'react'
import Flex from '@chakra-ui/core/dist/Flex'
import Spinner from '@chakra-ui/core/dist/Spinner'

const PageSpinner = () =>
    <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
        <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="primary.200"
            color="primary.500"
            size="xl"
        />
    </Flex>

export default PageSpinner