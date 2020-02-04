import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { withForm } from './DocumentForm'
import Editor from './Editor'
import { EditorState, ContentState, convertToRaw } from 'draft-js'

// : DocumentEditor is a shim that passes along the editorState in
// : a way that can be submitted as part of the document form to the
// : Firestorter session. It references a perfectly standalone editor
// : and has methods for calling up that data and submitting it,
// : validation, autosaving, and transformation.

@inject('store')
@observer
@withForm
class DocumentEditor extends Component {

  // Make a ref to the editor to access its built-in functions and state
  editor = React.createRef()

  componentDidMount() {

    // Set initial state
    const content = ContentState.createFromText(`Welcome to the editor! ${this.props.id}`)
    const initialState = EditorState.createWithContent(content)
    this.editor.current.editorState = initialState
    
  }


  // get code from editor

  // autosave editor

  // save before exit

  render() {

    const { store, document } = this.props

    return (
      <Editor ref={this.editor} />
    )
  }
}

export default DocumentEditor