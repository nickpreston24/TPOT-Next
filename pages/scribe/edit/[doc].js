import { Document as FireStorterDocument } from "firestorter";
import { observer, PropTypes as MobXPropTypes } from "mobx-react";
import React, { useState } from "react";
import Dashboard from "../../../components/Dashboard";
import DocumentDetails from "../../../components/DocumentDetails";
import DocumentForm from "../../../components/DocumentForm";
import DocumentEditor from "../../../components/DocumentEditor";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RichEditor } from "../../../components/RichEditor";
import EditorView from "../../../components/Editor/experimental/EditorView";
import DraftView from "../../../components/Editor/experimental/DraftView";
import { compose } from "recompose";
import PropTypes from 'prop-types';

// : Document is the dynamic route page for Scribe's editable documents
// : It fetches data for the given paper based on the route and provides
// : the document data to its children, Details Panel & Editor through
// : the wrapper component Document Form (which has submittal methods)

const Page = props => {

  // ID comes from getInitialProps via NextJS's context provider
  const { id } = props

  // Document needs to be done this way so we don't loose the live-update subscribers ( for the checkout table, etc.)
  const [document, setDocument] = useState(new FireStorterDocument(`sessions/${id}`))

  // This is a MobX observable interally, so its reactive.
  const { isLoading } = document

  if (isLoading) {
    return (
      <Dashboard title={`TPOT Scribe - TIP - ${id}`}>
        <CircularProgress />
      </Dashboard>
    )
  }

  return (
    <DocumentForm {...{ document }}>
      <Dashboard
        title={`TPOT Scribe - Edit - ${id}`}
        details={() => <DocumentDetails {...{ document }} />}
      >
        <DocumentEditor {...{ document, id }} />
        {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        All of the classes below can be pulled out on their own and they 
        self-manage. If you pass down refs to them, you can control them. 😜 */}
        {/* <EditorView /> */}
        {/* <DraftView /> */}
        {/* <RichEditor document={document} /> */}
      </Dashboard>
    </DocumentForm>
  )
}

Page.propTypes = {
  id: PropTypes.string.isRequired,
  document: MobXPropTypes.objectOrObservableObject,
}

// Only the ID is needed here, but you could imagine all the goodies that could be done:
// https://nextjs.org/docs/api-reference/data-fetching/getInitialProps#context-object
Page.getInitialProps = async context => {
  const id = context.query.doc
  return { id }
}

export default compose(
  observer
)(Page)
