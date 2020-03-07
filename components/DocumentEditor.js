import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { withForm } from './DocumentForm'
import Editor from './Editor'
import { EditorState, convertFromRaw } from 'draft-js'
import { toJS, action } from 'mobx'
import { Button } from '@material-ui/core'

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
    // Set a Auto-Save Timer for the Editor's content (1 mins)
    this.timer = setInterval(() => this.save(this.props), 60000)
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

  @action.bound save = () => {
    // const plainText = this.editor.current.plainText
    // console.log(
    //   // this.editor.current.editorState,
    //   // this.editor.current.stylesheet,
    //   this.editor.current.original,
    //   // this.editor.current.code,
    // )

    // status: 'not-started',
    // contributors: store.authUser.email,
    // date_uploaded: new Date(),
    // date_modified: new Date(),
    // draft: JSON.stringify(draftState),
    // code: JSON.stringify(codeState),
    // original: JSON.stringify(html),
    // stylesheet: JSON.stringify(newBaseStyleMap),
    // filename: file.name,
    // title: title,
    // slug: `letters/${slug}.htm`,
    // excerpt: ''
    // this.props.document.set({ draft: plainText }, { merge: true })
    this.props.store.notify('Saved Document Successfully!', 'info')
  }



  setMode(name) {
    this.editor.current.mode = name
  }

  render() {

    // When the component mounts, have it check back to re-init itself with the first editorState after the document data is fetched.
    const { document } = this.props
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
        <Editor ref={this.editor} saveFn={this.save} />
      </>
    )
  }
}

export default DocumentEditor