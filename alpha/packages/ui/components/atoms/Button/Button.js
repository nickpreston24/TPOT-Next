import { Button, Stack } from '@chakra-ui/react'

import React from 'react'

const ButtonC = () => {
  return (
    <Stack spacing={4} direction='row' align='center'>
      <Button colorScheme='purple' size='xs'>
        Button
      </Button>
      <Button variant="pink" colorScheme='red' size='sm'>
        Button
      </Button>
      <Button colorScheme='blue' size='md'>
        Button
      </Button>
      <Button colorScheme='teal' size='lg'>
        Button
      </Button>
      <Button colorScheme='green' size='xl'>
        Button
      </Button>
      <Button>
        Default
      </Button>
    </Stack>
  )
}

// ButtonC.propTypes = {
//   /**
//    * The input name of the component
//    */
//   name: PropTypes.string.isRequired
// }

// ButtonC.defaultProps = {
//   name: 'Name'
// }

export default ButtonC
