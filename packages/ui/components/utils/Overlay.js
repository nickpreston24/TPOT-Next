import { Box, VStack } from '@chakra-ui/react'

import { default as NextLink } from 'next/link'
import React from 'react'

const Overlay = () => {
  const routes = [
    '/',
    '/scribe/overview',
    '/scribe/new',
    '/scribe/edit',
    '/scribe/checkout'
  ]

  return (
    <Box
      pos='fixed'
      px={3}
      py={4}
      top={2}
      right={2}
      bg='gray.100'
      boxShadow='md'
      borderRadius='lg'
    >
      <VStack align='left'>
        {routes.map((path, idx) => (
          <Box key={idx} color='blue.500' _hover={{ textDecor: 'underline' }}>
            <NextLink href={path}>
              <a>{path}</a>
            </NextLink>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

export default Overlay
