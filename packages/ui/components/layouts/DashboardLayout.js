import { Box, Input, Stack } from '@chakra-ui/react'

import PropTypes from 'prop-types'
import React from 'react'
import { layout as fullpageLayout } from './FullpageLayout'

const DashboardLayout = ({ children }) => {
  // useEffect(() => {
  //   console.log('mounted')
  //   return () => {
  //     console.log('unmounting')
  //   }
  // }, [])

  return (
    <Stack bg='gray.100' h='100vh' w="100%" spacing={0}>
      <Box h={250} bg='gray.600' p={2} >
        <Input color="white" />
      </Box>
      <Box flexGrow={1}>
        {children}
      </Box>
    </Stack>
  )
}

DashboardLayout.propTypes = {
  /**
   * The input name of the component
   */
  name: PropTypes.string.isRequired
}

DashboardLayout.defaultProps = {
  name: 'Name'
}

export const layout = page =>
  fullpageLayout(<DashboardLayout>{page}</DashboardLayout>)

export default DashboardLayout
