import { } from './functions/index';
import { EditorState, Modifier, RichUtils } from "draft-js";
import Editor from 'draft-js-plugins-editor';
import { useRef, useState } from "react";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SubmitButton } from "./buttons/SubmitButton";
import { plugins, RedoButton, sampleEditorState, UndoButton } from './plugins';
import { getJsonFromRaw } from './functions'
import { generateHtmlFromEditorState } from './functions'
import styles, { colorStyleMap } from './styles'

let publish = null; //TODO: use Publisher class

/* 
 * A rich text Draft Editor that uses Draft JS Plugins library  
 */
export const RichEditor = ({ draftState }) => {

  if (!draftState)
    draftState = null
  // console.log('what I got from DocEditor: ', html)
  // console.log(wp, 'raw draft:', draft, 'draft editor state: ', EditorState.createWithContent(convertFromRaw(JSON.parse(draft))))  

  // TODO: Ensure this always gets passed in, instead of init here:



  const editorRef = useRef(null);
  const { root, editor } = styles;
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
    // console.log('Next state: ', nextstate.toJS()) //intercept?
    // let text = humanize(nextstate);
    // console.log("Current Text: ", text);

    setEditorState(nextstate);
  };

  // const focus = () => editorRef.current.focus()

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

      <div style={editor}>
        <Editor
          ref={editorRef}
          blockStyleFn={getBlockStyle}
          onFocus={logState}
          customStyleMap={colorStyleMap}
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
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

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: '"', style: "blockquote" },
  { label: "*-", style: "unordered-list-item" },
  { label: "1..3", style: "ordered-list-item" },
  // { label: "-S-", style: "STRIKETHROUGH" },
  // { label: "-S-", style: "line-through" }
  // { label: "Code Block", style: "code-block" }
];

const getBlockStyle = block => {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
};

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => {
        return (
          <PrimaryButton
            // palette={palette}
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )
      })}
    </div>
  );
};

const ColorPicker = props => {

  var currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div>
      {COLORS.map(color =>
        <PrimaryButton
          key={color.label}
          active={currentStyle.has(color.style)}
          label={color.label}
          onToggle={props.onToggle}
          style={color.style}
        // style={"color-" + colorStyleMap[color.style].color}
        // style={"color-#bada55"}
        />)
      }
    </div>
  )
}

var COLORS = [
  { label: 'Red', style: 'red' },
  { label: 'Orange', style: 'orange' },
  { label: 'Yellow', style: 'yellow' },
  { label: 'Green', style: 'green' },
  { label: 'Blue', style: 'blue' },
  { label: 'Indigo', style: 'indigo' },
  { label: 'Violet', style: 'violet' },
  { label: 'Awesome', style: 'awesome' },
  { label: 'Giraffe', style: 'giraffe' },
  { label: 'Mutt', style: 'doggie' },
  { label: 'Upstack', style: 'upstack' },
  { label: 'Taters', style: 'taters' },
  { label: 'TPOT', style: 'teapot' },
];


var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <PrimaryButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};