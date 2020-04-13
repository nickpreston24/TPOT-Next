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
  const [editorProperties, setEditorProperties] = useState(null);

  // Initialize the EditorViews's data for all
  // types (original, draft, code, etc.)

  useEffect(() => {
    // Destructure the document's fields
    const documentData = toJS(document.data)
    let { draft, code, original, stylesheet } = documentData

    // Parse out each field and convert to target format
    draft = JSON.parse(draft)
    code = JSON.parse(code)
    original = JSON.parse(original)
    stylesheet = JSON.parse(stylesheet)

    // Build a state to initialize the child's Draft mode
    const contentState = convertFromRaw(draft)
    const draftEditorState = EditorState.createWithContent(contentState)

    // Set all the child's modes' states
    // const test = subscribe()
    // // console.log('CHILD', childProperties)
    // console.log('CHILD', editorProperties)
    const childEditor = editorRef.current
    if (!editorRef.current) return
    // editorRef.hello
    // childEditor.stylesheet = stylesheet
    // childEditor.original = original
    // childEditor.code = code

    console.log('Initialized the editor')
    // console.log('Statemeny', test)
    console.log(editorRef.current)
    // console.log(editorRef.current.getPluginMethods())
    console.log('Edito Reference?')
    console.log(draftRef.current)
  }, [editorRef])

  // // Setup an Autosave Timer
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (id) props.store.save(id)
  //   }, 10000)
  //   return () => clearInterval(timer)
  // })

  if (document) {
    return (
      // You can replace what is below here with another draft editor intead of <Editor /> if you wanted to
      <EditorView
        editorRef={editorRef}
        draftRef={draftRef}
        mode={mode}
        handleSave={() => store.save(id)}
        children={
          <ModeSwitcher {...{ mode, setMode }} />
        }
      />
      // <RichEditor
      //   document={document}
      //   //TODO: @BP, The following props must be defined before I can use them like in EditorView
      //   editorRef={this.editor}
      //   draftState={state}
      // ></RichEditor>
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
      <Button color={mode === 'original' ? 'secondary' : 'primary'} onClick={() => setMode('original')}>Original</Button>
      <Button color={mode === 'draft' ? 'secondary' : 'primary'} onClick={() => setMode('draft')}>Draft</Button>
      <Button color={mode === 'code' ? 'secondary' : 'primary'} onClick={() => setMode('code')}>Code</Button>
      <Button color={mode === 'blocks' ? 'secondary' : 'primary'} onClick={() => setMode('blocks')}>Blocks</Button>
    </ButtonGroup>
  )
}
