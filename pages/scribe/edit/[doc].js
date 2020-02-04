import { Document as FireStorterDocument } from 'firestorter'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import Dashboard from '../../../components/Dashboard'
import DocumentDetails from '../../../components/DocumentDetails'
import DocumentForm from '../../../components/DocumentForm'
import DocumentEditor from '../../../components/DocumentEditor'

// : Document is the dynamic route page for Scribe's editable documents
// : It fetches data for the given paper based on the route and provides
// : the document data to its children, Details Panel & Editor through
// : the wrapper component Document Form (which has submittal methods)

@inject('store')
@observer
class Document extends Component {

  render() {

    const { store, router } = this.props
    const { doc } = router.query
    const document = new FireStorterDocument(`sessions/${doc}`) || 'cat'

    return (
      <DocumentForm {...{ document }}>
        <Dashboard title={`TPOT Scribe - Edit - ${doc}`}
          details={() => <DocumentDetails {...{ document }} />}
        >
          <DocumentEditor {...{ document, id: doc }} />
        </Dashboard>
      </DocumentForm>
    )
  }
}

export default Document