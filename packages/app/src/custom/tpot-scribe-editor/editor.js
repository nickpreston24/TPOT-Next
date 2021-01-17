import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import CKEditor from '@ckeditor/ckeditor5-react'
import React, { useRef } from 'react'
import '@ckeditor5-build-fully-featured/sample/styles.css'

const App = React.forwardRef((props, ref) => {
  const editorRef = ref || useRef(null)

  return (
    <div className='App'>
      <h2>CKEditor 5 using a custom DocumentEditor build</h2>
      <CKEditor
        ref={editorRef}
        onInit={(editor) => {
          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            )
        }}
        onChange={(event, editor) => console.log({ event, editor })}
        editor={DecoupledEditor}
        data="<p>Hello from CKEditor 5's DecoupledEditor!</p>"
      />
    </div>
  )
})

export default App
