import { PrimaryButton } from '../buttons/PrimaryButton'
import { EditorStateNotFoundError, NullReferenceError } from '../../Errors'

/** Draft JS plugins */
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from 'draft-js-buttons';

import createUndoPlugin from 'draft-js-undo-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import UnderConstruction from '../../Editor/components/UnderConstruction';
// import createFocusPlugin from 'draft-js-focus-plugin';
// import createAlignmentPlugin from 'draft-js-alignment-plugin';
// import editorStyles from './editorStyles.css';

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

const undoPlugin = createUndoPlugin();

// const sideToolbarPlugin = createSideToolbarPlugin();

// const focusPlugin = createFocusPlugin();

// const alignmentPlugin = createAlignmentPlugin();

// const { AlignmentTool } = alignmentPlugin;
// const decorator = composeDecorators(
//   alignmentPlugin.decorator,
//   focusPlugin.decorator,
// );

const linkifyPlugin = createLinkifyPlugin({
    //property 'component' renders the component you want, instead of the normal anchor tag:
    component: (props) => (
        <a {...props} onClick={() => {
            console.log(props)
            alert('Clicked on link!')
        }} />
    )
});

export const plugins = [linkifyPlugin, undoPlugin, staticToolbarPlugin];
export const { UndoButton, RedoButton } = undoPlugin;

let sampleText = "Hello there!"

export const sampleEditorState = createEditorStateWithText(sampleText)

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

export const getBlockStyle = block => {
    switch (block.getType()) {
        case "blockquote":
            return "RichEditor-blockquote";
        default:
            return null;
    }
};

export const BlockStyleControls = ({ editorState, onToggle }) => {

    if (!editorState)
        throw new EditorStateNotFoundError();

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
                        onToggle={onToggle}
                        style={type.style}
                    />
                )
            })}
        </div>
    );
};

export const ColorPicker = ({ editorState, onToggle }) => {

    if (!editorState)
        throw new EditorStateNotFoundError();

    var currentStyle = editorState.getCurrentInlineStyle();

    return (
        <div>
            {COLORS.map(color =>
                <PrimaryButton
                    key={color.label}
                    active={currentStyle.has(color.style)}
                    label={color.label}
                    onToggle={onToggle}
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

export const InlineStyleControls = props => {
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