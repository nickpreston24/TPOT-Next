import '../../packages/ckeditor5-build-fully-featured/sample/styles.css'
import React, { useRef } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import CKEditorInspector from '@ckeditor/ckeditor5-inspector'
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import DecoupledEditor from '../../packages/ckeditor5-build-fully-featured/build/ckeditor'



// CKEditorInspector.attach()

// import ClassicEditor from './ckeditor5-build-scribe/src/ckeditor'

const config = {
  toolbar: {
    items: [
      'restrictedEditingException',
      'exportPdf',
      'code',
      'heading',
      '|',
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      'removeFormat',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'subscript',
      'superscript',
      'highlight',
      '|',
      'alignment',
      '|',
      'numberedList',
      'bulletedList',
      '|',
      'indent',
      'outdent',
      '|',
      'todoList',
      'link',
      'specialCharacters',
      'blockQuote',
      'imageUpload',
      '|',
      'codeBlock',
      'horizontalLine',
      'pageBreak',
      '|',
      'insertTable',
      'mediaEmbed',
      '|',
      'undo',
      'redo'
    ],
  },
  language: 'en',
  // plugins: [Font],
  image: {
    toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ],
  },
  licenseKey: '',
}

const App = React.forwardRef((props, ref) => {

  const editorRef = ref || useRef(null)

  const attachInspector = editor => {
    // If in development mode
    CKEditorInspector.attach(editor, { isCollapsed: true })
  }

  return (
    <div className="App">
      <h2>CKEditor 5 using a custom DocumentEditor build</h2>
      <CKEditor
        ref={editorRef}
        onInit={editor => {
          attachInspector(editor)
          editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
          )
        }}
        onChange={(event, editor) => console.log({ event, editor })}
        editor={DecoupledEditor}
        data="<p>Hello from CKEditor 5's DecoupledEditor!</p>"
        // config={config}
      />
    </div>
  )
})

export default App

// import React from 'react'
// import CKEditor from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// // import ScribePreset from './preset/ckeditor5-build-scribe/build/ckeditor'

// import Font from '@ckeditor/ckeditor5-font/src/font'

// console.log(CKEditor)
// // console.log(ClassicEditor)

// const config = {
//   toolbar: {
//     items: [
//       'heading',
//       '|',
//       'fontSize',
//       'fontFamily',
//       '|',
//       'bold',
//       'italic',
//       'underline',
//       'strikethrough',
//       'highlight',
//       '|',
//       'alignment',
//       '|',
//       'numberedList',
//       'bulletedList',
//       '|',
//       'indent',
//       'outdent',
//       '|',
//       'todoList',
//       'link',
//       'blockQuote',
//       'imageUpload',
//       'insertTable',
//       'mediaEmbed',
//       '|',
//       'undo',
//       'redo',
//     ],
//   },
//   language: 'en',
//   plugins: [Font],
//   image: {
//     toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
//   },
//   table: {
//     contentToolbar: [
//       'tableColumn',
//       'tableRow',
//       'mergeTableCells',
//       'tableCellProperties',
//       'tableProperties',
//     ],
//   },
//   licenseKey: '',
// }

// const ScribeEditor = React.forwardRef((props, ref) => (
//   <CKEditor
//     ref={ref}
//     // disabled
//     editor={ClassicEditor}
//     config={config}
//     data="<p>Hello from CKEditor 5!</p>"
//     onInit={(editor) => {
//       // You can store the "editor" and use when it is needed.
//       // console.log('Editor is ready to use!', editor)
//     }}
//     onChange={(event, editor) => {
//       // const data = editor.getData()
//       // console.log({ event, editor, data })
//     }}
//     onBlur={(event, editor) => {
//       // console.log('Blur.', editor)
//     }}
//     onFocus={(event, editor) => {
//       // console.log('Focus.', editor)
//     }}
//   />
// ))

// export default ScribeEditor
