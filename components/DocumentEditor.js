import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { withForm } from './DocumentForm'
import Editor from './Editor'
import { EditorState, convertFromRaw } from 'draft-js'
import { toJS, action } from 'mobx'
import { Button } from '@material-ui/core'

// Document editor is a shim that connects our feature-rich DraftJS editor to
// Toolbox. When the shim mounts a reference is made to our <Editor /> child.
// The Editor is designed in a way to be drag and drop and application independant.
// This shim allows us to connect our application and state and call methods off
// the standalone editor, such as mode switching, saving, initial state, etc. It
// also allows us to ask the standalone editor for his data so we can publish it.

@inject('store')
@withForm
@observer
class DocumentEditor extends Component {

  // Make a ref to the standalone editor to access its built-in functions and state
  editor = React.createRef()

  componentDidMount() {
    // Set a Auto-Save Timer for the Editor's content (1 mins)
    this.timer = setInterval(() => this.props.store.save(this.props.id), 60000)
  }

  componentWillUnmount() {
    clearInterval(this.timer) // Very important to clear! :D
  }

  init() {
    // Set initial editor states from first fetch of document
    let { document } = this.props
    let { draft, code, original, stylesheet } = toJS(document.data)
    draft = JSON.parse(draft)
    code = JSON.parse(code)
    original = JSON.parse(original)
    stylesheet = JSON.parse(stylesheet)
    const contentState = convertFromRaw(draft)
    const initialState = EditorState.createWithContent(contentState)
    this.editor.current.editorState = initialState
    this.editor.current.stylesheet = stylesheet
    this.editor.current.original = original
    this.editor.current.code = code
  }

  setMode(name) {
    this.editor.current.mode = name
  }

  render() {

    // When the component mounts, have it check back to re-init itself with the first editorState after the document data is fetched.
    const { document, store, id } = this.props
    let hasData = Object.keys(toJS(document.data)) !== 0
    if (hasData && !!this.editor.current) {
      this.init()
    }

    return (
      <>
        <Button onClick={() => this.setMode('original')}>Original</Button>
        <Button onClick={() => this.setMode('draft')}>Draft</Button>
        <Button onClick={() => this.setMode('code')}>Code</Button>
        <Button onClick={() => this.setMode('blocks')}>Blocks</Button>
        <Editor 
          ref={this.editor} 
          saveFn={() => store.save(id)} 
        />
      </>
    )
  }
}

export default DocumentEditor