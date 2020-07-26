import React, { useEffect, useState } from 'react'
import { sessions } from '@stores'
import { observer } from 'mobx-react'
import { Document } from 'firestorter'
import Template from '@templates/PaperEditor'
import { is } from 'immutable'
import { toJS, has } from 'mobx'
import { useRouter } from 'next/router'
import { async } from 'rxjs/internal/scheduler/async'


// Returns a static Document instance that has guarenteed data
const useDocument = (collection, id) => {

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

  console.log(toJS(currentDoc.data), isLoading, hasData)

  return (
    <Template 
      editorProps={{
        currentDoc
      }}
    />
  )
}

export default Page