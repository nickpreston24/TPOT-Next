import { Box, Button, ChakraProvider, useColorMode, useColorModeValue } from '@chakra-ui/react'

import React from 'react'
import theme from '@theme'

const ColorModeToggle = () => {
  const { toggleColorMode } = useColorMode()
  const color = useColorModeValue('gray', 'blue')
  const text = useColorModeValue('Light', 'Dark')

  return (
    <Box pos='fixed' right={2} top={2} zIndex={9999}>
      <Button size='sm' colorScheme={color} onClick={toggleColorMode}>{text}</Button>
    </Box>
  )
}

export const parameters = {
  layout: 'centered',
  actions: { argTypesRegex: '^on[A-Z].*' }
}

export const decorators = [
  StoryFn => (
    <ChakraProvider theme={theme}>
      <ColorModeToggle />
      <StoryFn />
    </ChakraProvider>
  )
]
