import { inject, observer } from 'mobx-react'
import React, { Component, useState, useEffect, useRef } from 'react'
import { withForm } from './DocumentForm'
import EditorView from './Editor/experimental/EditorView'
import { convertFromRaw, EditorState } from 'draft-js'
import { toJS } from 'mobx'
import { Button, ButtonGroup } from '@material-ui/core'
import CircularProgress from "@material-ui/core/CircularProgress";
import { RichEditor } from './RichEditor'
import { NullReferenceError } from './Errors'
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
  const store = props.store || null
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
  const [mode, setMode] = useState('draft');

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

    // Get the current interally referenced children
    const editorChild = editorRef.current
    const draftChild = draftRef.current


    // Set all initial values for each child
    // editorRef.current.setCode(code)
    // editorRef.current.setBlocks(draft) // document.data.draft is already the equivalent of blocks
    // editorRef.current.setOriginal(code)
    // editorRef.current.setStylesheet(stylesheet)
    // editorRef.current.setEditorState(editorState)
    console.log('EDITOR')
    console.log(editorRef)
    console.log(editorRef.current)
    console.log('DRAFT')
    console.log(draftRef)
    console.log(draftRef.current)
  }, [])


  // Supply callbacks that the Editor can invoke interally with key commands
  const handleSave = () => {
    props.store.save(id)
  }
  

  const handlePublish = () => {
    console.log('handled publishing')
  }

  
  const handleDuplicate = () => {
    console.log('handled duplication')
  }


  // // Setup an Autosave Timer
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (id) props.store.save(id)
  //   }, 60000)
  //   return () => clearInterval(timer)
  // }, [])


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


export default compose(
  inject('store'),
  observer
)(DocumentEditor)




// Auxillary Components

function ModeSwitcher({ mode, setMode }) {
  return (
    <ButtonGroup variant="outlined">
      <Button color={mode === 'original' ? 'secondary' : 'primary'} onClick={() => setMode('original')}>Paper</Button>
      <Button color={mode === 'draft' ? 'secondary' : 'primary'} onClick={() => setMode('draft')}>Editor</Button>
      <Button color={mode === 'code' ? 'secondary' : null} onClick={() => setMode('code')}>Code</Button>
      <Button color={mode === 'blocks' ? 'secondary' : null} onClick={() => setMode('blocks')}>Blocks</Button>
    </ButtonGroup>
  )
}



// <RichEditor
//   document={document}
//   //TODO: @BP, The following props must be defined before I can use them like in EditorView
//   editorRef={editorRef}
//   draftState={state} //INFO: @MP, this can be fixed. I know it doesn't work if you untoggle RichEditor
// ></RichEditor>