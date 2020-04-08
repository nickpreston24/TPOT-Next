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