import React from 'react'
import { sessions } from '@stores'
import { observer } from 'mobx-react'
import Template from '@templates/PaperEditor'


const Page = observer(props => {

  const { id } = props

  return (
    <Template 
      editorProps={{
        doc: 'currentDoc'
      }}
    />
  )
})

export default Page