import React from 'react'
import Dashboard from '@components/Dashboard'
import PropTypes from 'prop-types'
import { MyEditor } from 'tpot-scribe-editor'
import { Stack, Spinner } from '@chakra-ui/core'
import { sessions } from '@stores'
import { observer } from 'mobx-react'
// import { CurrentSessions } from '../../../components/list'

const Page = observer(props => {

  const { id } = props

  const { docs, isLoading } = sessions;

  return (
    <Stack>
      <Dashboard
        title={`TPOT Scribe - Edit - ${id}`}
      >
        {/* <h1 color="green">Hello, Editor! Your doc id is: {id}</h1> */}

        {isLoading
          ? <Spinner />
          : <MyEditor />}
          
        {/* <MyEditor ref={ref} /> */}
        {/* {isLoading ? <Spinner /> : <Editor ref={ref} />} */}

        {/* TODO: Query by author id and Observe() like in the firestorter docs */}
        {/* {isLoading
          ? <Spinner />
          : <CurrentSessions
            entries={docs}
            title="Your Current Drafts" />} */}

      </Dashboard>
    </Stack>
  )
})

/** Working Code */

// const Page = props => {

//   console.log('props ([doc]) :>> ', props);
//   const { id } = props

//   const ckeditorRef = useRef(null)

//   const getHtml = () => {
//     const html = ckeditorRef.current.editor.getData()
//     console.log(html)
//   }


//   // console.log('CkEditor :>> ', MyEditor, 'editorRef: ', ckeditorRef);

//   return (
//     <Dashboard
//       title={`TPOT Scribe - Edit - ${id}`}
//     // details={() => <DocumentDetails {...{ document }} />}
//     >
//       <Box
//         height="100%"
//       >
//         {/* <Editor ref={ckeditorRef} /> */}
//         {/* <MyEditor ref={ckeditorRef} /> */}
//         <div>Hello, CK Editor</div>
//         <WordPressToolbar {...{ getHtml }} />
//       </Box>
//     </Dashboard>
//   )
// }

Page.propTypes = {
  id: PropTypes.string.isRequired,
}

// // Only the ID is needed here, but you could imagine all the goodies that could be done:
// // https://nextjs.org/docs/api-reference/data-fetching/getInitialProps#context-object
Page.getInitialProps = async context => {
  console.log('context :>> ', context);
  const id = context.query.doc
  console.log('id ([doc]) :>> ', id);
  return { id }
}

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
