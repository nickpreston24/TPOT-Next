import EditorView from '../Editor/views/EditorView'
import { observer, PropTypes as MobXPropTypes } from 'mobx-react'
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { convertFromRaw, EditorState } from 'draft-js'
import { toJS } from 'mobx'
import { Button, ButtonGroup } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { compose } from 'recompose'

// Document editor is a shim that connects our feature-rich DraftJS editor to
// Toolbox. When the shim mounts a reference is made to our <Editor /> child.
// The Editor is designed in a way to be drag and drop and application independent.
// This shim allows us to connect our application and state and call methods off
// the standalone editor, such as mode switching, saving, initial state, etc. It
// also allows us to ask the standalone editor for his data so we can publish it.

function DocumentEditor(props) {

  // Validate Props
  const document = props.document || null
  const id = props.id || null

  // Render a loader if props don't check out
  if (!document) {
    return <CircularProgress />
  }

  // Editor is now safe to render. 
  // code dependent on props is below:
  // ______________________________

  // Create a reference to the child, EditorView
  const editorRef = useRef(null) // Access Functions that affect Original, Code, Draft, etc.
  const draftRef = useRef(null) // Access functions that affect the Vanilla Draft Editor

  // Create local states
  const [mode, setMode] = useState('draft')

  // Initialize the EditorViews's data for all
  // types (original, draft, code, etc.)
  useEffect(() => {

    // Destructure the document's fields
    const documentData = toJS(document.data)
    let { draft, code, original, stylesheet } = documentData

    // Parse out each field and convert to target format
    code = JSON.parse(code)
    draft = JSON.parse(draft)
    original = JSON.parse(original)
    stylesheet = JSON.parse(stylesheet)

    // Build a state to initialize the child's 'Draft' mode
    const contentState = convertFromRaw(draft)
    const editorState = EditorState.createWithContent(contentState)

    // Set all initial values for each child
    try {
      editorRef.current.setCode(code)
      editorRef.current.setBlocks(draft) // document.data.draft is already the equivalent of blocks
      editorRef.current.setOriginal(code)
      editorRef.current.setStylesheet(stylesheet)
      editorRef.current.setEditorState(editorState)
    } catch (error) {
      console.warn('There is no DraftView in EditorView. Make sure on is in the render statement and you pass down draftRef from DocumentEditor')
    }
  }, [])

  // Supply callbacks that the Editor can invoke interally with key commands
  const handleSave = () => {
    props.store.save(id)
  }

  const handlePublish = () => {
    // console.log('handled publishing')
  }

  const handleDuplicate = () => {
    // console.log('handled duplication')
  }

  // Setup an Autosave Timer
  useEffect(() => {
    // const timer = setInterval(() => {
    //   if (id) props.store.save(id)
    // }, 60000)
    return () => { }//clearInterval(timer)
  }, [])

  if (document) {
    return (
      <EditorView
        editorRef={editorRef}
        draftRef={draftRef}
        mode={mode}
        handleSave={handleSave}
        handlePublish={handlePublish}
        handleDuplicate={handleDuplicate}
        children={
          <ModeSwitcher {...{ mode, setMode }} />
        }
      />
    )
  }
}

DocumentEditor.propTypes = {
  id: PropTypes.string.isRequired,
  store: MobXPropTypes.objectOrObservableObject.isRequired,
  document: MobXPropTypes.objectOrObservableObject.isRequired,
}

export default compose(observer)(DocumentEditor)

// Auxillary Components

const ModeSwitcher = ({ mode, setMode }) => {
  return (
    <ButtonGroup variant="outlined">
      <Button color={mode === 'original' ? 'secondary' : 'primary'} onClick={() => setMode('original')}>Paper</Button>
      <Button color={mode === 'draft' ? 'secondary' : 'primary'} onClick={() => setMode('draft')}>Editor</Button>
      {/* !IMPORTANT: These modes below all work, but will likely only be used by ADMINS */}
      <Button color={mode === 'code' ? 'secondary' : null} onClick={() => setMode('code')}>Code</Button>
      <Button color={mode === 'blocks' ? 'secondary' : null} onClick={() => setMode('blocks')}>Blocks</Button>
    </ButtonGroup>
  )
}

ModeSwitcher.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
}





// <RichEditor
//   document={document}
//   //TODO: @BP, The following props must be defined before I can use them like in EditorView
//   editorRef={editorRef}
//   draftState={state} //INFO: @MP, this can be fixed. I know it doesn't work if you untoggle RichEditor
// ></RichEditor>