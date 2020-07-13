import React, { Component } from 'react'
import Dashboard from '@components/Dashboard'
import ZeitCard from '@components/experimental/ZeitCard'
import * as ROUTES from '@constants/routes'
import { MyEditor } from 'tpot-scribe-editor'
import { disableMe } from 'components/disableMe'
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
