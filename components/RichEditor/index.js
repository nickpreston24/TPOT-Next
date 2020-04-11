import { } from './plugins/index';
import { EditorState, Modifier, RichUtils } from "draft-js";
import { useRef, useState } from "react";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SubmitButton } from "./buttons/SubmitButton";
import { plugins, RedoButton, sampleEditorState, UndoButton } from './plugins';
import { generateHtmlFromEditorState, getJsonFromRaw } from './functions'
import Editor from 'draft-js-plugins-editor';
import styles, { colorStyleMap } from './styles'

let publish = null; //TODO: use Publisher class

/* 
 * A rich text Draft Editor that uses Draft JS Plugins library  
 */
export const RichEditor = ({ draftState, editorRef }) => {

  if (!draftState || !editorRef)
    return <div>Not Ready!</div>   
  
  editorRef = editorRef || useRef(null);

  const { root, content } = styles;
  // const [editorState, setEditorState] = useState(draftState || EditorState.createEmpty());

  // console.log('result of getting editor state from html: ', getEditorStateFromHtml(html))

  const [editorState, setEditorState] = useState(draftState
    // || getEditorStateFromHtml(html) 
    || sampleEditorState
  );

  const handleKeyCommand = (command, state) => {
    const nextState = RichUtils.handleKeyCommand(state, command);

    if (nextState) {
      onChange(nextState);
      return "handled";
    }

    return "not-handled";
  };

  const toggleBlockType = type => {
    onChange(RichUtils.toggleBlockType(editorState, type));
  };

  const toggleInlineStyle = type => {
    onChange(RichUtils.toggleInlineStyle(editorState, type));
  };

  const onChange = nextstate => {
    setEditorState(nextstate);
  };

  const focus = () => editorRef.current.focus()

  const logState = () => {
    //TODO: on Error, log state dump to firebase errors table
    console.log("Current state (onFocus):", editorState.toJS());
  };

  const toggleColor = (toggledColor) => {
    // console.log('toggled color:', toggledColor);

    const selection = editorState.getSelection();
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

    const currentStyle = editorState.getCurrentInlineStyle();

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

  // TODO: Unsure what to do, should I plug it in somewhere?
  // const handlePastedText = (text, styles, editorState) => {
  //     setEditorState({
  //         editorState: removeEditorStyles(text, editorState),
  //     });
  // };

  // const alterColorMap = colorStyleMap.map(x => {
  //   console.log('alt color', x.color);
  //   return x.;
  // })

  return (
    <div className="RichEditor-root" style={root}>

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

      <div style={content}>
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
          onFocus={logState}
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
  );
}