import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { withForm } from './DocumentForm'
import Editor from './Editor'
import { EditorState, convertFromRaw } from 'draft-js'
import { toJS } from 'mobx'
import { Button, ButtonGroup } from '@material-ui/core'
import CircularProgress from "@material-ui/core/CircularProgress";

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
    // Initialize the Draft editor with the document's data
    this.init()
    // Set a Auto-Save Timer for the Editor's content (1 mins)
    this.timer = setInterval(() => this.props.store.save(this.props.id), 600000)
  }

  componentWillUnmount() {
    clearInterval(this.timer) // Very important to clear! :D
  }

  // the init() function fills in data for Draft editor - including an initial, immutable DraftState :)
  init() {
    let { document } = this.props
    if (!document) return // Ditch if there is no document, will render a a <CircularProgress /> instead.
    let { draft, code, original, stylesheet } = toJS(document.data)
    draft = JSON.parse(draft)
    code = JSON.parse(code)
    original = JSON.parse(original)
    stylesheet = JSON.parse(stylesheet)
    const contentState = convertFromRaw(draft)
    const initialState = EditorState.createWithContent(contentState)
    let editorRef = this.editor.current
    // If there is no editor.current it is because this.props.document is null and we are rendering a <CircularProgress />
    if (!editorRef) return
    editorRef.editorState = initialState
    editorRef.stylesheet = stylesheet
    editorRef.original = original
    editorRef.code = code
  }

  // the setMode() function switches between 'Original', 'Draft' and 'Code' modes in the <Editor />
  setMode(name) {
    this.editor.current.mode = name
  }

  render() {
    const { document, store, id } = this.props
    const mode = this.editor.current ? this.editor.current.mode : 'draft'
    const noData = document.isLoading

    return (
      <>
        {noData
          // No Document, duck safely out with a loader, just incase (... should already provided from [doc].js )
          ? <CircularProgress />
          // Yay Document! Render the Editor
          : (
            <>
              {/* You can replace what is below here with another draft editor intead of <Editor /> if you wanted to */}
              <Editor ref={this.editor} saveFn={() => store.save(id)} >
                <ButtonGroup variant="outlined">
                  <Button color={ mode === 'original' ? 'secondary' : 'primary' } onClick={() => this.setMode('original')}>Original</Button>
                  <Button color={ mode === 'draft' ? 'secondary' : 'primary' } onClick={() => this.setMode('draft')}>Draft</Button>
                  <Button color={ mode === 'code' ? 'secondary' : 'primary' } onClick={() => this.setMode('code')}>Code</Button>
                  <Button color={ mode === 'blocks' ? 'secondary' : 'primary' } onClick={() => this.setMode('blocks')}>Blocks</Button>
                </ButtonGroup>
              </Editor>
            </>
          )
        }
      </>
    )
  }
}

export default DocumentEditor