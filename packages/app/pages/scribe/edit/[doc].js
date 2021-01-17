import React from 'react'
import { useRouter } from 'next/router'
import { sessions } from '@stores'
import Template from '../../../components/templates/PaperEditor'

const Page = () => {

  const router = useRouter()
  const { query: { doc } } = router

  const { docs } = sessions;

  // TODO: This might load all sessions, however, getting the new Document by id caused issues for me.
  let currentDoc = docs.filter(s => s.id === doc)[0]

  return (
    <Template
      editorProps={{
        currentDoc
      }}
    />
  )
}

export default Page