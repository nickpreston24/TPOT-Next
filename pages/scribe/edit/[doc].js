import React, { useEffect, useState } from 'react'
import { Document } from 'firestorter'
import { useRouter } from 'next/router'
import Template from '@templates/PaperEditor'


// Returns a static Document instance that has guarenteed data
export const useDocument = (collection, id) => {

  const [doc, set] = useState({})
  const { hasData = false, isLoading = true } = doc

  useEffect(() => {
    const fbDoc = new Document(`${collection}/${id}`, { mode: 'off' })
    const fetchDoc = async () => {
      const fetchedDoc = await fbDoc.fetch()
      set(fetchedDoc)
    }
    !!id && fetchDoc()
  }, [id])

  return [doc, isLoading, hasData]
}


const Page = props => {

  const router = useRouter()
  const { query: { doc } } = router

  const [currentDoc, isLoading, hasData] = useDocument('sessions', doc)

  return (
    <Template 
      editorProps={{
        currentDoc
      }}
    />
  )
}

export default Page