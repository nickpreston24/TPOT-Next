import { Document as FireStorterDocument } from "firestorter";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import Dashboard from "../../../components/Dashboard";
import DocumentDetails from "../../../components/DocumentDetails";
import DocumentForm from "../../../components/DocumentForm";
import DocumentEditor from "../../../components/DocumentEditor";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RichEditor } from "../../../components/RichEditor";
import EditorView from "../../../components/Editor/experimental/EditorView";
import DraftView from "../../../components/Editor/experimental/DraftView";

// : Document is the dynamic route page for Scribe's editable documents
// : It fetches data for the given paper based on the route and provides
// : the document data to its children, Details Panel & Editor through
// : the wrapper component Document Form (which has submittal methods)

@inject("store")
@observer
class Document extends Component {

  // Get the Document from 'sessions' that corresponds to the route's doc ID. (ex: 59nupA5TcAMeU9vxFbVa)
  document = new FireStorterDocument(`sessions/${this.props.router.query.doc}`);

  render() {
    const { router } = this.props;
    const { document } = this
    const { isLoading } = document
    const { doc } = router.query;

    // console.log(
    //   'doc', doc
    //   , 'isLoading', !!isLoading
    //   , 'document', !!document
    //   , 'router', !!router
    // )

    // console.info('RENDER ([doc.js])')
    return (
      <>
        {isLoading ? (
          // Render the Dashboard with a Loader when Document is still fetching
          <Dashboard title={`TPOT Scribe - Edit - ${doc}`}>
            <CircularProgress />
          </Dashboard>
        ) : (
            // Render the Dashboard with the Editor and Details when document is ready
            <DocumentForm {...{ document }}>
              <Dashboard
                title={`TPOT Scribe - Edit - ${doc}`}
                details={() => <DocumentDetails {...{ document }} />}
              >
                <DocumentEditor {...{ document, id: doc }} />
                {/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                All of the classes below can be pulled out on their own and they 
                self manage. If you pass down refs to them, you can control them. :D */}
                {/* <EditorView /> */}
                {/* <DraftView /> */}
                {/* <RichEditor document={document} /> */}
              </Dashboard>
            </DocumentForm>
          )}
      </>
    );

  }
}

export default Document;
