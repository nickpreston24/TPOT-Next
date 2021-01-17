import Box from '@chakra-ui/core/dist/Box'
import Flex from '@chakra-ui/core/dist/Flex'
import React from 'react'
import Header from '@organisms/Header'
import Navbar from '@organisms/Navbar'

export const Layout = ({ children }) => {
  return (
    <Flex id='frame' position='absolute' height='100%' width='100%' bg='gray.100'>
      <Flex
        id='navbar'
        height='100%'
        bg='dark.700'
        color='white'
        transition='width 0.3s ease-in-out 0s'
        overflow='hidden'
        whiteSpace='nowrap'
        width={['100%', 0.85, 0.25, 0.25, 0.15]}
      >
        <Navbar />
      </Flex>
      <Flex id='content' flexGrow={1} bg='gray.100' flexDirection='column' overflow='hidden'>
        <Flex id='header' h={{ base: '70px' }} bg='white' boxShadow='sm'>
          <Header />
        </Flex>
        <Box overflowY='auto' pb={4} height='50%' id='content' flexGrow={1} w='100%'>
          {children}
        </Box>
      </Flex>
    </Flex>
  )
}

export default Layout
