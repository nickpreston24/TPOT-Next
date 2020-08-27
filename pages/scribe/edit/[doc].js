import React, { useEffect, useState } from 'react'
import { Document } from 'firestorter'
import { useRouter } from 'next/router'
import { sessions } from '@stores'
import Template from '@templates/PaperEditor'


// !! BUG - This hook is not working when you checkout a paper, then
// !! navigate to checkout, and then check out the same paper again.
// IDEA: useMemo to hold last document.  Perhaps it can cache between renders? - MP
// Returns a static Document instance that has guarenteed data
// export const useDocument = (collection, id) => {

//   const [doc, set] = useState({})
//   const { hasData = false, isLoading = true } = doc

//   useEffect(() => {
//     const fbDoc = new Document(`${collection}/${id}`, { mode: 'off' })
//     const fetchDoc = async () => {
//       const fetchedDoc = await fbDoc.fetch()
//       set(fetchedDoc)
//     }
//     !!id && fetchDoc()
//   }, [id])

//   return [doc, isLoading, hasData]
// }


const Page = props => {

  const router = useRouter()
  const { query: { doc } } = router

  // const [currentDoc, isLoading, hasData] = useDocument('sessions', doc)
  // TODO Added back in session.filter, because the above hook isn't working quite right

  const { docs, isLoading } = sessions;

  // This might load all sessions, however, getting the new Document by id caused issues for me.
  let currentDoc = docs.filter(s => s.id === doc)[0]

  // // We don't want this event occuring on NextJS's refreshing.
  // if (!isDev()) {

  //   useEffect(() => {
  //     window.addEventListener("beforeunload", (event) => {
  //       event.preventDefault();
  //       return (event || window.event).returnValue = 'Are you sure you want to close?';
  //     });

  //     return () => {
  //       window.removeEventListener('beforeunload', null)
  //     }
  //   }, [])
  // }

  return (
    <Template
      editorProps={{
        currentDoc
      }}
    />
  )
}

export default Page