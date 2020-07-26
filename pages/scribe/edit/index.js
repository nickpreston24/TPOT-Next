import React, { Component } from 'react'
import Layout from '@components/Dashboard'
import { MyEditor } from 'tpot-scribe-editor'
import { Box } from '@chakra-ui/core'

const NewEdit = () => (

  <Box>
    <Layout
      title={`TPOT Scribe - New`}
    >
      <MyEditor />
    </Layout>
  </Box>
)

export default NewEdit
