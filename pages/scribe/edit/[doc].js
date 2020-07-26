import React from 'react'
import { Layout } from '@components'
import { MyEditor } from 'tpot-scribe-editor'
import { Stack, Box, Spinner } from '@chakra-ui/core'
import { sessions } from '@stores'
import { observer } from 'mobx-react'

const authorId = 9;
const queryLimit = 10;

const Page = observer(props => {

  const { id } = props

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
