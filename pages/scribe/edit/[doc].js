import React, { useEffect, useState } from 'react'
import { Document } from 'firestorter'
import { useRouter } from 'next/router'
import { sessions } from '@stores'
import Template from '@templates/PaperEditor'

const Page = props => {

  const router = useRouter()
  const { query: { doc } } = router

  const { docs, isLoading } = sessions;

  // TODO: This might load all sessions, however, getting the new Document by id caused issues for me.
  let currentDoc = docs.filter(s => s.id === doc)[0]

// console.log('currentDoc', currentDoc)
  return (
    <Template
      editorProps={{
        currentDoc
      }}
    />
  )
}

export default Page