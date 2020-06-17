import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Dashboard from '../../../components/Dashboard'
import Editor from 'tpot-scribe-editor'
import Button from '@material-ui/core/Button'

const Page = props => {

  const { id } = props

  const ref = useRef(null)

  const getHTML = () => {
    const HTML = ref.current.editor.getData()
    console.log(HTML)
  }

  return (
    <Dashboard
      title={`TPOT Scribe - Edit - ${id}`}
      // details={() => <DocumentDetails {...{ document }} />}
    >
      <Button onClick={getHTML}>Get Editor HTML</Button>
      <Editor ref={ref} />
    </Dashboard>
  )
}

Page.propTypes = {
  id: PropTypes.string.isRequired,
}

// Only the ID is needed here, but you could imagine all the goodies that could be done:
// https://nextjs.org/docs/api-reference/data-fetching/getInitialProps#context-object
Page.getInitialProps = async context => {
  const id = context.query.doc
  return { id }
}

export default Page

// import { Document as FireStorterDocument } from 'firestorter'
// import { observer, PropTypes as MobXPropTypes } from 'mobx-react'
// import React, { useState } from 'react'
// import CircularProgress from '@material-ui/core/CircularProgress'
// import { compose } from 'recompose'
// import PropTypes from 'prop-types'
// import Dashboard from '../../../components/Dashboard'
// import { DocumentDetails, DocumentForm, DocumentEditor } from '../../../components/Document'

// // : Document is the dynamic route page for Scribe's editable documents
// // : It fetches data for the given paper based on the route and provides
// // : the document data to its children, Details Panel & Editor through
// // : the wrapper component Document Form (which has submittal methods)

// const Page = props => {

//   // ID comes from getInitialProps via NextJS's context provider
//   const { id } = props

//   // Document needs to be done this way so we don't loose the live-update subscribers ( for the checkout table, etc.)
//   const [document, setDocument] = useState(new FireStorterDocument(`sessions/${id}`))

//   // This is a MobX observable interally, so its reactive.
//   const { isLoading } = document

//   if (isLoading) {
//     return (
//       <>
//         {isLoading ? (
//           // Render the Dashboard with a Loader when Document is still fetching
//           <Dashboard title={`TPOT Scribe - TIP - ${id}`}>
//             <CircularProgress />
//           </Dashboard>
//         ) : (
//             // Render the Dashboard with the Editor and Details when document is ready
//             <DocumentForm {...{ document }}>
//               <Dashboard
//                 title={`TPOT Scribe - Edit - ${doc}`}
//                 details={() => <DocumentDetails {...{ document }} />}
//               >
//                 <DocumentEditor {...{ document, id: doc }} />
//                 {/* <RichEditor/> */}
//               </Dashboard>
//             </DocumentForm>
//           )}
//       </>
//     )
//   }

//   return (
//     <DocumentForm {...{ document }}>
//       <Dashboard
//         title={`TPOT Scribe - Edit - ${id}`}
//         details={() => <DocumentDetails {...{ document }} />}
//       >
//         <DocumentEditor {...{ document, id }} />
//         {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//         All of the classes below can be pulled out on their own and they
//         self-manage. If you pass down refs to them, you can control them. 😜 */}
//         {/* <EditorView /> */}
//         {/* <DraftView /> */}
//         {/* <RichEditor document={document} /> */}
//       </Dashboard>
//     </DocumentForm>
//   )
// }

// Page.propTypes = {
//   id: PropTypes.string.isRequired,
//   document: MobXPropTypes.objectOrObservableObject,
// }

// // Only the ID is needed here, but you could imagine all the goodies that could be done:
// // https://nextjs.org/docs/api-reference/data-fetching/getInitialProps#context-object
// Page.getInitialProps = async context => {
//   const id = context.query.doc
//   return { id }
// }

// export default compose(
//   observer
// )(Page)
