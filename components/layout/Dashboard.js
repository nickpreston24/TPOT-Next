import React from 'react'
import Box from '@chakra-ui/core/dist/Box'
import Flex from '@chakra-ui/core/dist/Flex'
import Header from '@organisms/Header'
import Navbar from '@organisms/Navbar'

const Layout = ({children}) => {

    return (
        <Flex id="frame" position="absolute" height="100%" width="100%" bg="gray.100">
            <Flex id="navbar" height="100%" minW={260} maxW={260} bg="dark.700" color="white" transition="width 0.3s ease-in-out 0s" overflow="hidden" whiteSpace="nowrap">
                <Navbar />
            </Flex>
            <Flex id="content" flexGrow={1} bg="gray.100" flexDirection="column" overflow="hidden">
                <Flex id="header" minH={70} h={70} bg="white" boxShadow="sm">
                    <Header />
                </Flex>
                <Box id="content" flexGrow={1} w="100%" p={4} overflowY="scroll" pt={16}>
                    {children}
                </Box>
            </Flex>
        </Flex>
    )
}

export default Layout