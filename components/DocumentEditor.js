import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { withForm } from './DocumentForm'
import Editor from './Editor'
import { EditorState, ContentState } from 'draft-js'
import { toJS } from 'mobx'

// : DocumentEditor is a shim that passes along the editorState in
// : a way that can be submitted as part of the document form to the
// : Firestorter session. It references a perfectly standalone editor
// : and has methods for calling up that data and submitting it,
// : validation, autosaving, and transformation.

@inject('store')
@withForm
@observer
class DocumentEditor extends Component {

  // Make a ref to the editor to access its built-in functions and state
  editor = React.createRef()

  componentDidMount() {

    // Mark Checked-Out and Push latest Author

    // Set a Auto-Save Timer for the Editor's content (5 mins)
    this.timer = setInterval(() => this.save(this.props), 60000)

  }

  init() {
    // Set initial editor state from content
    let { document } = this.props
    const { draft_state } = toJS(document.data)
    const contentState = ContentState.createFromText(draft_state)
    const initialState = EditorState.createWithContent(contentState)
    this.editor.current.editorState = initialState
  }

  save() {
    const plainText = this.editor.current.plainText
    console.log('text to save', plainText)
    this.props.document.set({ draft_state: plainText }, { merge: true })
    this.props.store.notify('Saved Document Successfully!', 'info')
  }

  componentWillUnmount() {
    // Very important to clear! :D
    clearInterval(this.timer)
  }

  setMode(name) {
    this.editor.current.mode = name
  }

  // get code from editor

  // save before exit

  // publish

  // preview?

  render() {

    // When the component mounts, have it check back to re-init itself with the first editorState after the document data is fetched.
    const { document } = this.props
    let hasData = Object.keys(toJS(document.data)) !== 0
    if (hasData && !!this.editor.current) {
      this.init()
    }

    return (
      <>
        <button onClick={() => this.setMode('draft')}>Original</button>
        <button onClick={() => this.setMode('draft')}>Draft</button>
        <button onClick={() => this.setMode('draft')}>Code</button>
        <button onClick={() => this.setMode('draft')}>Blocks</button>
        <Editor ref={this.editor} />
      </>
    )
  }
}

export default DocumentEditor