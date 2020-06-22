import { EditorState, Modifier, RichUtils, convertFromRaw } from 'draft-js'
import { useRef, useState } from 'react'
import { UnderConstruction } from '@pages/404'

import { SubmitButton } from './buttons/SubmitButton'

import {
  plugins
  , RedoButton
  , sampleEditorState
  , UndoButton
  , BlockStyleControls
  , InlineStyleControls
  , ColorPicker
  , getBlockStyle,
  ToolbarMP
} from './plugins'

import {
  generateHtmlFromEditorState
  , getJsonFromRaw
  , logState

} from './functions'

import Editor from 'draft-js-plugins-editor'
import styles, { colorStyleMap } from './styles'
import { ArgumentNullReferenceError } from '../Errors'
// import { Toolbar } from '../Editor/components/Toolbar'
let publish = null //TODO: use Publisher class

/* 
 * A rich text Draft Editor that uses Draft JS Plugins library  
 */
export const RichEditor = ({

  // Required props:
  // document
  // Optional props:
  draftState = sampleEditorState
  , editorRef = null
}

  // From DraftView:


) => {

  if (!document) {
    return UnderConstruction(new ArgumentNullReferenceError('document').message)
  }

  if (!draftState)
    return UnderConstruction('draftState was not provided') // TODO: use a 404 here.

  // if (!editorRef)
  //   return UnderConstruction('editorRef was not provided')

  // console.log('Current document: ', document)

  if (!draftState) {
    console.log('draftState: ', draftState, 'editorRef:', editorRef)
    return UnderConstruction('Draft state wasn\'t ready')
  }

  // editorRef = editorRef || useRef(null);

  const { root, content } = styles

  const [editorState, setEditorState] = useState(sampleEditorState)

  const handleKeyCommand = (command, state) => {
    const nextState = RichUtils.handleKeyCommand(state, command)

    if (nextState) {
      onChange(nextState)
      return 'handled'
    }

    return 'not-handled'
  }

  const toggleBlockType = type => {
    onChange(RichUtils.toggleBlockType(editorState, type))
  }

  const toggleInlineStyle = type => {
    onChange(RichUtils.toggleInlineStyle(editorState, type))
  }

  const onChange = nextstate => {
    setEditorState(nextstate)
  }

  const toggleColor = (toggledColor) => {
    // console.log('toggled color:', toggledColor);

    const selection = editorState.getSelection()
    // console.log('selection: ', selection);

    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        // console.log('color', colorStyleMap[color].color);
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent())

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    )

    const currentStyle = editorState.getCurrentInlineStyle()

    // Unset the style override for the current color:
    if (selection.isCollapsed()) {
      // console.log('unset style.');
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color)
      }, nextEditorState)
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      // console.log('applied color!', currentStyle);
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      )
    }

    onChange(nextEditorState)
  }

  return (
    <div className="RichEditor-root" style={root}>

      <ToolbarMP />
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />

      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />

      <ColorPicker
        editorState={editorState}
        onToggle={toggleColor}
      />

      {/* Universal controls */}
      {/* <PrimaryButton onClick={clear}>Clear</PrimaryButton> */}
      <UndoButton />
      <RedoButton />

      <div style={content} >
        <Editor
          /* Required */
          ref={editorRef}
          plugins={plugins}
          onChange={onChange}
          editorState={editorState}
          customStyleMap={colorStyleMap}
          handleKeyCommand={handleKeyCommand}

          /*Local Funcs */
          blockStyleFn={getBlockStyle}
          onFocus={logState(editorState)}
        />
      </div>

      {!!publish && <SubmitButton
        onClick={publish}>Publish to TPOT</SubmitButton>}

      <div>
        <h4>JSON:</h4>
        {getJsonFromRaw(editorState)}
      </div>

      <div>
        <h4>HTML:</h4>
        {/* {JSON.stringify(getHtml())} */}
        {generateHtmlFromEditorState(editorState)}
      </div>

    </div>
  )

}











