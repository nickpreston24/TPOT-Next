<<<<<<< HEAD
import React from 'react'
import { Layout } from '@components'
import { MyEditor } from 'tpot-scribe-editor'
import { Stack, Box, Spinner } from '@chakra-ui/core'
import { sessions } from '@stores'
import { observer } from 'mobx-react'
=======
import React, { useEffect, useState } from 'react'
import { Document } from 'firestorter'
import { useRouter } from 'next/router'
import { sessions } from '@stores'
import Template from '@templates/PaperEditor'
>>>>>>> ec08a0962c726c070e9f59b39dd167f7b13f8d4b


// !! BUG - This hook is not working when you checkout a paper, then
// !! navigate to checkout, and then check out the same paper again.

// Returns a static Document instance that has guarenteed data
// export const useDocument = (collection, id) => {

<<<<<<< HEAD
  const { docs, isLoading } = sessions;

  // This might load all sessions, however, getting the new Document by id caused issues for me.
  let currentDoc = docs.filter(s => s.id === id)[0]

  return (
    <Box>
      <Layout
        title={`TPOT Scribe - Edit - ${id}`}
      >
        {isLoading
          ? <Spinner />
          : <MyEditor doc={currentDoc} />
        }
      </Layout>
    </Box>
  )
})


// Page.propTypes = {
//   id: PropTypes.string.isRequired,
// }

// // Only the ID is needed here, but you could imagine all the goodies that could be done:
// // https://nextjs.org/docs/api-reference/data-fetching/getInitialProps#context-object

// Page.getInitialProps = async context => {
//   // console.log('context :>> ', !!context);
//   const id = context.query.doc
//   // console.log('id ([doc]) :>> ', id);
//   return { id }
// }

export default Page
=======
//   const [doc, set] = useState({})
//   const { hasData = false, isLoading = true } = doc
>>>>>>> ec08a0962c726c070e9f59b39dd167f7b13f8d4b

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

  return (
    <Template 
      editorProps={{
        currentDoc
      }}
    />
  )
}

export default Page