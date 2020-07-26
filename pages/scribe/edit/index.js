import React, { Component } from 'react'
import Dashboard from '@components/Dashboard'
import { MyEditor } from 'tpot-scribe-editor'
import { Box } from '@chakra-ui/core'

const NewEdit = () => (

  <Box>
    <Dashboard
      title={`TPOT Scribe - New`}
    >
      <MyEditor />
    </Dashboard>
  </Box>
)

export default NewEdit
