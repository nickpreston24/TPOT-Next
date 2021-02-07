import { sessions } from '@stores'
import { useRouter } from 'next/router'
import React from 'react'
import Template from '@templates/PaperEditor'

const Page = () => {
  const router = useRouter()
  const {
    query: { doc },
  } = router

  const { docs } = sessions

  let currentDoc = docs.filter((s) => s.id === doc)[0]

  return (
    <Template
      editorProps={{
        currentDoc,
      }}
    />
  )
}

export default Page
